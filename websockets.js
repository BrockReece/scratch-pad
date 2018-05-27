(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};
    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
    
    var heardSocket = false
    var lastMessage = false
    ext.cnct = function () {
        window.socket = new WebSocket("ws://127.0.0.1:8081");
        window.socket.onmessage = function (message) { 
            heardSocket = true
            lastMessage = message.data
        }
    }

    ext.cnct()

    ext.get_socket_data = function(callback) {
        callback(lastMessage)
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
            ['R', 'last socket data', 'get_socket_data'],
            ['h', 'recieve web socket', 'on_socket']
        ]
    };
    // Register the extension
    ScratchExtensions.register('Websockets', descriptor, ext);
})({});
