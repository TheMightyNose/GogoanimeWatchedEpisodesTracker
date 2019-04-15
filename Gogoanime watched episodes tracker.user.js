// ==UserScript==
// @name         Gogoanime watched episodes tracker
// @namespace    https://github.com/TheMightyNose
// @version      0.1
// @description  see name
// @author       TheMightyNose
// @match        https://www2.gogoanime.io/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    console.info("GWET is running.");

    addButton();

    console.info(localStorage.getItem(window.location.href));

    setPageVisited();



    setInterval(colorizeLinks, 250);

    function addButton(){
        let elements = document.getElementsByClassName("anime_video_body_watch");
        if(elements[0] != null)
        {
            //console.info(elements[0].innerHTML);
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
        if(localStorage.getItem(window.location.href) == null)
        {
            localStorage.setItem(window.location.href, "visited");
        }
    }

    function setAnimeWatched(){
        //console.info("button click!");
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
        //console.info("still alive");
        let elements = document.getElementsByTagName('a');
        for(let i = 0; i< elements.length; i++){
            //console.info(elements[i].href);
            if(elements[i].href.includes("episode"))
            {

            if(localStorage.getItem(elements[i].href ) == "watched")
            {
                elements[i].style.backgroundColor = "green";
            }
            else if (localStorage.getItem(elements[i].href) == "visited")
            {
                elements[i].style.backgroundColor = "red";
            }
            }
        }
    }
})();