exports = module.exports = function(io) {

    var socketList=[];
    var onlineList={};
    var memberList={};
    var onlinePosList={};
    var memberPosList={};
    var onlineAvaList={};
    var memberAvaList={};


    io.on('connection', function(socket) {
        console.log('new connection.')
        socket.on('login', function (obj) {
            memberList[obj.name] = obj.name;
            memberPosList[obj.name] = obj.pos;
            memberAvaList[obj.name] = obj.avatar;

            if(!socketList[obj.name]){
                //socketList[obj.name] = socket;
                onlineList[obj.name] = obj.name;
                onlinePosList[obj.name] = obj.pos;
                onlineAvaList[obj.name] = obj.avatar;
                //console.log("socket:  !!")
                //console.log(socketList);
                console.log("online LIst:    !!");
                console.log(onlinePosList);
                console.log(memberPosList);
                console.log(onlineAvaList);
                console.log(memberAvaList);
                socket.name = obj.name;



            }
            io.emit('pos broadcast',{'onlineList':onlineList,'onlinePosList':onlinePosList,'onlineAvaList':onlineAvaList,'memberList':memberList,'memberPosList':memberPosList,'memberAvaList':memberAvaList});
            //socket.name = obj.name;
            //console.log(obj.name);
        })
        socket.on('disconnect', function () {
            console.log(socket.name + 'discounncted');
            if(onlineList[socket.name]) {
                delete onlineList[socket.name];
                delete onlinePosList[socket.name];
                delete onlineAvaList[socket.name];

                if (socketList[socket.name]) {
                    delete socketList[socket.name];
                }
                io.emit('pos broadcast',{'onlineList':onlineList,'onlinePosList':onlinePosList,'onlineAvaList':onlineAvaList,'memberList':memberList,'memberPosList':memberPosList,'memberAvaList':memberAvaList});
            }
        })
        socket.on('chat', function (txt) {
            io.emit('chat broadcast', txt);
            console.log(txt);
        })
        // socket.on('pos', function (loc) {
        //
        //
        //     console.log("POSonline LIst:    !!")
        //     console.log(onlineList);
        //     //io.emit('pos broadcast', loc);
        //     io.emit('pos broadcast',{'onlineList':onlineList,'onlinePosList':onlinePosList,'onlineAvaList':onlineAvaList,'memberList':memberList,'memberPosList':memberPosList,'memberAvaList':memberAvaList});
        //         //console.log(loc);
        //     //}
        // })
    })
}