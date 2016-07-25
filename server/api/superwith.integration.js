/**
 * Superwith tests every possible combination of additional parameters to
 * an endpoint.
 *
 * Example:
 * superwith.test([
 * 	{
 * 		param: "withInstructor=true",
 * 		should: "get instructor",
 * 		test: (obj) => expect(obj.instructor.is.not.null
 * 	},
 * 	{
 * 		param: "withStudents=true",
 * 		should: "get students",
 * 		test: (obj) => expect(obj.students.is.a('array')
 * 	},
 * ])(request)
 *
 *	All of the following tests will then be executed...
 *
 *  GET /path
 *  GET /path?withInstructor=true
 *  GET /path?withStudents=true
 *  GET /path?withInstructor=true&withStudents=true
 *
 *
 *
 * 	More advanced functionality is also possible. In some cases, certain
 * 	parameters should only be tested in the presence of another parameter.
 *
 * superwith.test([
 * 	{
 * 		param: "withInstructor=true",
 * 		should: "get instructor",
 * 		test: (obj) => expect(obj.instructor.is.not.null,
 * 	},
 * 	{
 * 		param: "withStudents=true",
 * 		should: "get students",
 * 		test: (obj) => expect(obj.students.is.a('array')
 * 		params: [
 * 			{
 * 				param: "withStudentsCourses=true",
 * 				should: "get student courses",
 * 				test: (obj) => expect(obj.students[0].courses).to.be.a('array')
 * 			}
 * 		]
 * 	},
 * ])(request)
 *
 * This will execute the following tests...
 *  GET /path
 *  GET /path?withInstructor=true
 *  GET /path?withStudents=true
 *  GET /path?withStudents=true&withStudentsCourses=true
 *  GET /path?withInstructor=true&withStudents=true
 *  GET /path?withInstructor=true&withStudents=true&withStudentsCourses=true
 *
 * The "skip" attribute will allow the test to appear as "pending" when the
 * test suite is run and the test will not be run.
 *
 * A parameter list can also specify parameters to never be run with using
 * the "neverWith" : [paramName, paramName...] attribute. NOT CURRENTLY
 * SUPPORTED TODO
 *
 * The "expectFail" attribute can be used when failure is expected. NOT
 * CURRENTLY SUPPORTED TODO
 *
 *
 */

// var auth = require("../auth/local/test.integration");

module.exports = {
    test: superwithTest
};

function *combinations(elements){
    // Each element can either be present, or not present
    if (elements.length == 0){
        yield [];
    }else{
        for (var combination of combinations(elements.slice(1))){
            yield combination;

            if (!elements[0].params){
                yield combination.concat(elements[0]);
            }else{
                // dependent combinations
                var withFirst = combination.concat(elements[0]);
                for (var childCombination of combinations(elements[0].params)){
                    yield withFirst.concat(childCombination);
                }
            }
        }
    }
}

function superwithTest(req, endpoint, allParams){
    // it('superwith', (done)=>{
    if (endpoint.indexOf("?") == -1){
        endpoint += "?";
    }else{
        endpoint += "&";
    }

    for (let params of combinations(allParams)){

        let skip = params.some(p => p.skip);
        let paramShouldString = params.filter(p=>p.should).map(p=>p.should).join(",");
        let url = endpoint + params.map((p)=>p.param).join("&");

        (skip ? it : it.skip)(`should ${paramShouldString} for ${url}`, (done) => {
            req.get(url)
            .expect(200)
            .end((err, res) => {
                params.forEach((param) => {
                    try{
                        param.test(res.body);
                    }catch(e){
                        throw new Error("\n" +
                        "RESPONSE:\n" +
                        `${JSON.stringify(res.body)}\n\n` +
                        `DID NOT ${param.should}\n\n` +
                        `${e}`
                    );
                }
            });
            done();
        });
    });
}
}

// superwith('/api/course/', [
//     {
//         param: 'withStudent=true',
//         test: (obj) => {
//             obj.student = true;
//         }
//     }
// ]);
