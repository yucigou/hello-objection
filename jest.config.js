module.exports = {
	verbose: false,
	"reporters": [
 		"default",
    	[
    		"./node_modules/jest-html-reporter", 
    		{
        		"pageTitle": "Test Report",
        		"includeFailureMsg": true,
    		}
    	]
	]
};