<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
include './php/hierachie.php';


//test
    nextNotion(5);
    nextNotion(21);
    previousNotion(2);
    previousNotion(10);
    previousNotion(20);
    presentNotion(22);
    presentNotion(2);
    previousNotion(18);
//fin test

/**
 * La fonction qui retourne le fichier xml de la notion suivante à celle en cours
 * @param {type} position
 * @returns {undefined}
 */
function nextNotion($position)
{
   $pos = $position + 1;
   goToNotion($pos);
}

/**
 * La fonction qui retourne le fichier xml de la notion courante
 * @param {type} pos
 * @returns {undefined}
 */
function presentNotion($pos)
{
    if(goToNotion($pos + 1) === null)
    {
        echo "disable next";
    }
    if(goToNotion($pos - 1) === null)
    {
        echo "disable previous";
    }
}

/**
 * la fonction qui retourne le nom du fichier xml de la notion précedente à celle en cours
 * @param {type} position
 * @returns {undefined}
 */
function previousNotion($position)
{
    $pos = $position - 1;
    goToNotion($pos);
}

function goToNotion($pos)
{
    global $array;
    if(isset($array['slide'][$pos]))
    {
        
        echo "Notion_".$array['slide'][$pos].".xml";
        return "Notion_".$array['slide'][$pos].".xml";
    }
    else
    {
        return null;
    }
}
