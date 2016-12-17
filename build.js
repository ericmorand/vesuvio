'use strict';

const fs = require('fs-extra');
const path = require('path');
const merge = require('merge');
const postcss = require('postcss');
const log = require('log-util');

const Promise = require('promise');
const fsCopy = Promise.denodeify(fs.copy);
const fsRemove = Promise.denodeify(fs.remove);
const fsEmptyDir = Promise.denodeify(fs.emptyDir);
const fsReadFile = Promise.denodeify(fs.readFile);
const fsOutputFile = Promise.denodeify(fs.outputFile, 2);

const Stromboli = require('stromboli');

let componentsBuilderConfig = merge.recursive(true, require('./config/common'), require('./config/build'));

componentsBuilderConfig.componentRoot = 'src/components/page';
componentsBuilderConfig.distPath = 'dist';

let write = require('./lib/write');
let tmpPath = 'tmp';

let processStylesheet = function (cssFilePath, config) {
  let distPath = componentsBuilderConfig.distPath;

  return fsReadFile(cssFilePath).then(
    function (css) {
      return postcss(config.postcss.plugins).process(css.toString(), {from: cssFilePath}).then(
        function (result) {
          return fsOutputFile(path.join(path.dirname(cssFilePath), 'index.css'), result.css);
        }
      );
    }
  )
};

let componentsBuilder = new Stromboli();

fsEmptyDir(componentsBuilderConfig.distPath).then(
  function () {
    componentsBuilder.start(componentsBuilderConfig).then(
      function (components) {
        // write
        return write.writeComponents(components, componentsBuilderConfig.distPath).then(
          function () {

            let promises = [];
            var cssFiles = [];

            // promises.push(processScript(componentsBuilderConfig));
            // promises.push(processStylesheet(componentsBuilderConfig));
            //promises.push(processHtml(componentsBuilderConfig));

            components.forEach(function (component) {
              var componentLastName = path.parse(component.name).base;
              var from = path.join(componentsBuilderConfig.distPath, component.name, 'index.css');
              var to = path.join(componentsBuilderConfig.distPath, componentLastName + '.css');

              cssFiles.push(from);
              // promises.push(fsCopy(from, to));
              promises.push(processStylesheet(from, componentsBuilderConfig));
            });

            components.forEach(function (component) {
              var componentLastName = path.parse(component.name).base;
              var from = path.join(componentsBuilderConfig.distPath, component.name, 'index.html');
              var to = path.join(componentsBuilderConfig.distPath, componentLastName + '.html');

              promises.push(fsCopy(from, to));
            });

            // clean
            return Promise.all(promises).then(
              function () {
                return new Promise(function (fulfill, reject) {
                  var concat = require('concat-files');

                  concat(cssFiles, path.join(componentsBuilderConfig.distPath, 'index.css'), function (err) {
                    if (err) {
                      console.log(err);

                      reject(err);
                    }

                    fulfill();
                  })
                }).then(
                  function () {
                    return processStylesheet(path.join(componentsBuilderConfig.distPath, 'index.css'), componentsBuilderConfig).then(
                      function() {
                        return fsRemove(path.join(componentsBuilderConfig.distPath, 'page')).then(
                          function() {
                            log.info('> APP BUILD DONE');
                          }
                        )
                      }
                    )
                  },
                  function (err) {
                    console.log(err);
                  }
                )
              }
            );
          }
        );
      },
      function (err) {
        console.log(err);
      }
    )
  }
);
