const palette = code => text => `\u001B[${code}m${text}\u001B[39m`;

const grey = palette(90);
const yellow = palette(33);

module.exports = keys => {
    return `${yellow('vomit')} [pattern]

Pattern:
  ${keys.map(yellow).join('\n  ')}

Example:
  ${yellow('vomit random')}              Use \`random\` pattern
  ${yellow('vomit crazy')}               Use \`crazy\` pattern
  ${grey('-------')}
  ${yellow('vomit --help')}              Show help
`;
};
