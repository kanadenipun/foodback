/**
 * Created by nipunkanade on 16/12/15.
 */

// Global API configuration
var Api = new Restivus({
    useDefaultAuth: false,
    prettyJson: true
});


Api.addRoute('/post/:id', {
    get: function () {
        var id = this.urlParams._id; // "5"
        console.log(id);

        return {
            statusCode: 404,
            headers: {
                'Content-Type': 'text/plain',
                'X-Custom-Header': 'custom value'
            },
            body: 'There is nothing here!'
        };
    }
});