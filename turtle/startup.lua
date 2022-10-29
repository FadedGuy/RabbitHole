
function webSocketLoop()
    local ws, err = http.websocket("ws://localhost:6969")

    if err then
        print(err)
    elseif ws then
        ws.send("Turtle connected")

        while true do
            local message = ws.receive()
            if message == nil then
                break
            end
            
            print(message)
        end
    end
    if ws then
        ws.close()
    end
end

webSocketLoop()