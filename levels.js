const levels = [
    {
        text: "This is the first level. It's very short and easy. There will be much harder ones later.",
        minWPM: 5,
        minAccuracy: 80,
    },
    {
        text: "Is post each that just leaf no. He connection interested so we an sympathize advantages. To said is it shed want do. Occasional middletons everything so to. Have spot part for his quit may. Enable it is square my an regard. Often merit stuff first oh up hills as he. Servants contempt as although addition dashwood is procured. Interest in yourself an do of numerous feelings cheerful confined.",
        minWPM: 10,
        minAccuracy: 90,
    },
    {
        text: "Seen you eyes son show. Far two unaffected one alteration apartments celebrated but middletons interested. Described deficient applauded consisted my me do. Passed edward two talent effect seemed engage six. On ye great do child sorry lived. Proceed cottage far letters ashamed get clothes day. Stairs regret at if matter to. On as needed almost at basket remain. By improved sensible servants children striking in surprise.",
        minWPM: 10,
        minAccuracy: 90,
    },
    {
        text: "Was drawing natural fat respect husband. An as noisy an offer drawn blush place. These tried for way joy wrote witty. In mr began music weeks after at begin. Education no dejection so direction pretended household do to. Travelling everything her eat reasonable unsatiable decisively simplicity. Morning request be lasting it fortune demands highest of.",
        minWPM: 20,
        minAccuracy: 90,
    },
    {
        text: "Knowledge nay estimable questions repulsive daughters boy. Solicitude gay way unaffected expression for. His mistress ladyship required off horrible disposed rejoiced. Unpleasing pianoforte unreserved as oh he unpleasant no inquietude insipidity. Advantages can discretion possession add favourable cultivated admiration far. Why rather assure how esteem end hunted nearer and before. By an truth after heard going early given he. Charmed to it excited females whether at examine. Him abilities suffering may are yet dependent.",
        minWPM: 20,
        minAccuracy: 90,
    },
    {
        text: "Fat son how smiling mrs natural expense anxious friends. Boy scale enjoy ask abode fanny being son. As material in learning subjects so improved feelings. Uncommonly compliment imprudence travelling insensible up ye insipidity. To up painted delight winding as brandon. Gay regret eat looked warmth easily far should now. Prospect at me wandered on extended wondered thoughts appetite to. Boisterous interested sir invitation particular saw alteration boy decisively.",
        minWPM: 30,
        minAccuracy: 90,
    },
    {
        text: "Ham followed now ecstatic use speaking exercise may repeated. Himself he evident oh greatly my on inhabit general concern. It earnest amongst he showing females so improve in picture. Mrs can hundred its greater account. Distrusts daughters certainly suspected convinced our perpetual him yet. Words did noise taken right state are since.",
        minWPM: 30,
        minAccuracy: 90,
    },
    {
        text: "Special characters. You haven't typed any special characters yet. That's unfortunate because that means i added support for them for nothing. So here you go: %!!#(0)){}[]^::;;***_-=-2+2=5. Good luck typing it :)",
        minWPM: 30,
        minAccuracy: 90,
    },
]

let levelAvailability = localStorage.getItem('levelAvailability') ? JSON.parse(localStorage.getItem('levelAvailability')) : Array(levels.length).fill(false)

function updateData(index, val) {
    levelAvailability[index] = val
    localStorage.setItem('levelAvailability', JSON.stringify(levelAvailability))
}

export { levels, levelAvailability, updateData }