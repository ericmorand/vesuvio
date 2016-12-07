let Language = function (name, code, direction, lorem, loremShort) {
  return {
    name: name,
    code: code,
    direction: direction,
    lorem: lorem
  }
};

let languages = [
  new Language('Left-to-right', 'en', 'ltr', {
    long: 'Lorem ipsum dolor sit amet, ferri conclusionemque eum et. Ei accusata invenire convenire nam. Ad sit lorem ubique ceteros, probo illum consulatu no duo, nam laudem quaeque ne. Ne ius amet deleniti quaestio.',
    short: 'Lorem ipsum dolor sit amet, ferri conclusionemque eum et'
  }),
  new Language('Right-to-left', 'ar', 'rtl', {
    long: 'من المسرح والنرويج دون, احداث وتتحمّل والفرنسي كل بلا, حتى ٣٠ بقعة ا الفرنسية. مما ديسمبر العمليات الشّعبين ٣٠, لان في التنازلي استطاعوا. حادثة المتحدة عن وفي. أمام وحرمان دون تم. الغالي الثقيلة ذات ثم, فكانت الدولارات حين أي.',
    short: 'العمليات الشّعبين ٣٠, لان في التنازلي استطاعوا. حادثة المتحدة'
  })
];

let Direction = function (name, direction) {
  return {
    name: name,
    code: direction
  }
};

let directions = [
  new Direction('Left-to-right', 'ltr'),
  new Direction('Right-to-left', 'rtl')
];

module.exports = {
  languages: languages,
  directions: directions
};
