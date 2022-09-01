const fetch = require('node-fetch');
const fs = require("fs")
const letters = "abcdefghijklmnopqrstuvwxyzåäö"

ortNamn = []

async function main() {
    for (let i = 0; i < letters.length; i++) {
        for (let j = 0; j < letters.length; j++) {
            console.log("getting names for ", letters[i] + letters[j])
            await fetch("https://ortnamn.lantmateriet.se/api/ortnamnsregistret/ortnamn/kriterier/v1?namn=" + letters[i] + letters[j] + "&match=startsWith&transactionId=1", {
                "headers": {
                    "accept": "application/json, text/plain, */*",
                    "cookie": "cookieConsentOrtnamn=false",
                },
                "method": "GET"
            }).then(async (res) => {
                if (res.status != 200) {
                    console.log("error on", letters[i] + letters[j])
                    return
                }
                let parsed;
                try {
                    parsed = await res.json()
                    ortNamn = [...ortNamn, parsed.ortnamnSearchResponseItems]

                } catch (error) {
                    console.log("error", error.message, res)
                }
            })
        }
    }
    fs.writeFileSync("cities.json", JSON.stringify(ortNamn, null, 2), { flag: "w" })


}

main()
