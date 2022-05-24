const levels = [
    {
        text: "??f fff f j jj j jj fj jf fjf jff jfj",
        minWPM: 10,
        minAccuracy: 90
    },
    {
        text: "d dd d d k kkk k kk k dk kd dkd kdkd kdk kdkkd kd k ddk",
        minWPM: 10,
        minAccuracy: 90
    },
    {
        text: "fd df jk kj dfjk kjfd dkfj fd df jk kj dfjk kjfd dkfj",
        minWPM: 10,
        minAccuracy: 90
    },
    {
        text: "Any delicate you how kindness horrible outli",
        minWPM: 10,
        minAccuracy: 50
    },
    {
        text: "Any delicate you how kindness horrible outlived servants. You high bed wish help call draw side. Girl quit if case mr sing as no have. At none neat am do over will. Agreeable promotion eagerness as we resources household to distrusts. Polite do object at passed it is. Small for ask shade water manor think men begin.",
        minWPM: 10,
        minAccuracy: 50
    },
    {
        text: "He do subjects prepared bachelor juvenile ye oh. He feelings removing informed he as ignorant we prepared. Evening do forming observe spirits is in. Country hearted be of justice sending. On so they as with room cold ye. Be call four my went mean. Celebrated if remarkably especially an. Going eat set she books found met aware.",
        minWPM: 15,
        minAccuracy: 60
    },
    {
        text: "Wrote water woman of heart it total other. By in entirely securing suitable graceful at families improved. Zealously few furniture repulsive was agreeable consisted difficult. Collected breakfast estimable questions in to favourite it. Known he place worth words it as to. Spoke now noise off smart her ready.",
        minWPM: 60,
        minAccuracy: 90
    },
    {
        text: "some ery short level, but still imposible",
        minWPM: 120,
        minAccuracy: 100
    },
    {
        text: "lasASGLAJYdjf j13599u%@153264^la dflaj sdoi}{ {you are a pidar} []hehehre &9 ????? !!! ljas",
        minWPM: 60,
        minAccuracy: 100
    },
    {
        text: "the last level",
        minWPM: 20,
        minAccuracy: 100
    }
]

let levelAvailability = localStorage.getItem('levelAvailability') ? JSON.parse(localStorage.getItem('levelAvailability')) : Array(levels.length).fill(false)

function updateData (index, val) {
    levelAvailability[index] = val
    localStorage.setItem('levelAvailability', JSON.stringify(levelAvailability))
}

export {levels, levelAvailability, updateData}