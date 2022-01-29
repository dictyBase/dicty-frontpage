
if (module.hot) {
	module.hot.accept([])
}

var requireMap = {
    'common/data/annotations': require('common/data/annotations'),
    'react': require('react'),
    './Annotations.tsx': require('./Annotations.tsx')
};
var requireInRuntimeBase = require("/home/runner/work/dicty-frontpage/dicty-frontpage/node_modules/react-styleguidist/lib/loaders/utils/client/requireInRuntime").default;
var requireInRuntime = requireInRuntimeBase.bind(null, requireMap);
var evalInContextBase = require("/home/runner/work/dicty-frontpage/dicty-frontpage/node_modules/react-styleguidist/lib/loaders/utils/client/evalInContext").default;
var evalInContext = evalInContextBase.bind(null, "const React$0 = require('react');\nconst React = React$0.default || (React$0['React'] || React$0);\nconst Annotations$0 = require('./Annotations.tsx');\nconst Annotations = Annotations$0.default || (Annotations$0['Annotations'] || Annotations$0);", requireInRuntime);

module.exports = [{
        'type': 'code',
        'content': 'import annotations from "common/data/annotations"\n;<Annotations annotations={annotations} />',
        'settings': {},
        'evalInContext': evalInContext
    }]
	