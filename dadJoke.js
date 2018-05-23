(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};
    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
    
    var heardSocket = false
    ext.cnct = function () {
        window.socket = new WebSocket("ws://127.0.0.1:8081");
        window.socket.onmessage = function (message) { heardSocket = true }
    }

    ext.cnct()

    ext.get_joke = function(callback) {
        fetch('//icanhazdadjoke.com/',{
            headers: new Headers({
                "Accept": "application/json",
            }),
        }).then(response => response.json()).then((response) => {
            callback(response.joke)
        })
    }

    ext.on_socket = function() {
        if (heardSocket) {
            heardSocket = false
            return true
        }

        return false
    }

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['R', 'tell dad joke', 'get_joke'],
            ['h', 'recieve web socket', 'on_socket']
        ]
    };
    // Register the extension
    ScratchExtensions.register('Joke', descriptor, ext);
})({});
