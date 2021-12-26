let send = document.querySelector("#send")
let content = document.querySelector("#content")

send.addEventListener("click", function (e) {
    e.preventDefault()
    let str = content.value
    // console.log(str);

    let xhr = new XMLHttpRequest()
    xhr.open("post", "/searchAJAX")
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    //content=123&title=111
    let data = `content=${str}`  //重組資料
    xhr.send(data)
    xhr.onload = function () {
        console.log(xhr.responseText);
    }
})