export const context =
{
    "type:send-message": {
        "inputs": {
            "exampleData": [
                {
                    "clusterId": "test",
                    "token": ".....",
                    "method": "chat.postMessage",
                    "data": {
                        "channel": "...",
                        "text": "..."
                    }
                }
            ]
        },
        "outputs": {
            "exampleData": [
                {
                    "result": {
                        "channel": "D03FJ3UJHJM",
                        "message": {
                            "appId": "A03BBJWJSTD",
                            "botId": "B03C1BBGC64",
                            "team": "T03BQ73M1UH",
                            "text": ":wave: Hi from the slack connector! :partying_face:",
                            "ts": "1654636029.472959",
                            "type": "message",
                            "user": "U03BBJN8B34"
                        },
                        "ts": "1654636029.472959"
                    }
                }
            ]
        }
    },
    "id:Process_1": {
        "inputs": {
            "exampleData": [
                {
                    "text": ":wave: Hi from the slack connector! :partying_face:",
                    "data": {
                        "channel": "D03FJ3UJHJM",
                        "user": "John Doe"
                    }
                }
            ]
        },
        "outputs": {
            "exampleData": [
                {
                    "messageId": "T03BQ73M1UH"
                }
            ]

        }
    }
}