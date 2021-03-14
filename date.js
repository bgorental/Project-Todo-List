// module.exports.getDate = getDate;
// function getDate(){
//     let today = new Date();
//     let options = { 
//         weekday: 'long',
//         month  : 'long',
//         day    : 'numeric'
//     };
//     let currentDay = today.toLocaleDateString("en-US", options);
//     return currentDay;
// }
exports.getDate = function(){
    const today = new Date();
    const options = { 
        weekday: 'long',
        month  : 'long',
        day    : 'numeric'};
    const currentDay = today.toLocaleDateString("en-US", options);
    return currentDay;
}

// module.exports.getDay = getDay;
// function getDay(){
//     const today = new Date();
//     const options = { 
//         weekday: 'long',
//     };
//     const currentDay = today.toLocaleDateString("en-US", options);
//     return currentDay;
// }
exports.getDay = function(){
    const today = new Date();
    const options = { 
        weekday: 'long',};
    const currentDay = today.toLocaleDateString("en-US", options);
    return currentDay;
}