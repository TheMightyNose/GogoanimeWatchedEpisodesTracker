// ==UserScript==
// @name         Gogoanime Watched Episodes Tracker
// @namespace    https://github.com/TheMightyNose
// @version      0.3
// @description  see name
// @author       TheMightyNose
// @match        https://*.gogoanime.io/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    console.info("GWET is running.");

    addButton();
    setPageVisited();
    setInterval(colorizeLinks, 250);

    function addButton(){
        let elements = document.getElementsByClassName("anime_video_body_watch");
        if(elements[0] != null) {
            let watchedButton =document.createElement("BUTTON");
            watchedButton.innerHTML= "I watched this!";
            watchedButton.style.padding="5px";
            watchedButton.style.width="100%";
            watchedButton.onclick = setAnimeWatched;
            watchedButton.id = "watchedButton";

            if(localStorage.getItem(window.location.href) == "watched") {
                watchedButton.style.backgroundColor = "green";
            } else {
                watchedButton.style.backgroundColor = "red";
            }
            elements[0].appendChild(watchedButton);
        }
    }

    function setPageVisited(){
        if(localStorage.getItem(window.location.href) == null && window.location.href.includes("episode")) {
            localStorage.setItem(window.location.href, "visited");
        }
    }

    function setAnimeWatched(){
        let watchedButton = document.getElementById("watchedButton");

        if(localStorage.getItem(window.location.href) != "watched") {
            watchedButton.style.backgroundColor = "green";
            localStorage.setItem(window.location.href, "watched");
        } else {
            watchedButton.style.backgroundColor = "red";
            localStorage.setItem(window.location.href, "visited");
        }
    }

    function colorizeLinks(){
        let elements = document.getElementsByTagName('a');

        for(let i = 0; i< elements.length; i++){
            if(localStorage.getItem(elements[i].href ) == "watched") {
                elements[i].style.backgroundColor = "green";
            } else if (localStorage.getItem(elements[i].href) == "visited") {
                elements[i].style.backgroundColor = "red";
            }
        }
    }
})();