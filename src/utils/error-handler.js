const { StatusCodes }=require('http-status-codes');

class AppErrors extends Error {//* Error is an inbuilt class
    constructor(name="App Error"
        , message="Something Went Wrong"
        , explanation="Please Try Again Later"
        , statusCode=StatusCodes.INTERNAL_SERVER_ERROR)
        {
            super();
            this.message=message;
            this.explanation=explanation;
            this.name=name
            this.statusCode=statusCode;
    }
}

module.exports=AppErrors