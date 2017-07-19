/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global cours */

/**
 * @author Joy Jedidja
 */
$(document).ready(function(){
    
    $.ajax({
        type: "Get",
        url: "./cours/metadata.xml",
        dataType: 'xml',
        success: function (xml) {
            $(xml).find('metadata').each(function()
            {
                var titreCours = $(this).attr('titreCours');
                //$('<ul id=\'ulist\'></ul>').html('<li>'+titreCours+'</li>').appendTo('#scope');
                array = new Array();
                cours = new Object();
                array[0] = cours;
                cours.text = titreCours;
                cours.nodes = new Array();
                cours.slide = [];

                boolpartie = true;
                idP = "";
                titrePartie = "";
                lasttitrePartie = "";
                boolchapitre = true;
                titreChapitre = "";
                lasttitreChapitre = "";
                boolparagraphe = true;
                titreParagraphe = "";
                lasttitreParagraphe = "";
                bool = true;
                titre = "";
                lasttitre = "";
                lastid = "";
                compteurpartie = 0;
                compteurchapitre = 0;
                compteurparagraphe = 0;
                compteur = 0;
                position = 0;
                
                $(this).find('notion').each(function(){
                    titrePartie = lasttitrePartie;
                    titreChapitre = lasttitreChapitre;
                    titreParagraphe = lasttitreParagraphe;
                    titre = lasttitre;
                    idP = $(this).attr('id');
                    
                    //alert(bool);
                    getTitrePartie(this);
                    getTitreChapitre(this);
                    getTitreParagraphe(this);
                    getTitre(this);
                    if(titrePartie !== "NULL" && titrePartie !== lasttitrePartie)
                    {
                        boolpartie = false;
                        //$('<ul id='+idP.slice(0,1)+'  value = '+idP+' >'+titrePartie+'</ul>').appendTo('#ulist');
                        lasttitrePartie = titrePartie;
                        partie = new Object();
                        cours.nodes[compteurpartie++] = partie;
                        partie.text = titrePartie;
                        partie.nodes = new Array();
                        partie.position = position;
                        cours.slide[position++] = idP;
                         //console.log(partie);
                    }
                    
                    if(titreChapitre !== "NULL" && titreChapitre !== lasttitreChapitre)
                    {
                        boolchapitre = false;
                        //$('<ul id='+idP.slice(0,3)+' value = '+idP+' >'+titreChapitre+'</ul>').appendTo('#'+idP.slice(0,1));
                        lasttitreChapitre = titreChapitre;
                        chapitre = new Object();
                        partie.nodes[compteurchapitre++] = chapitre;
                        chapitre.text = titreChapitre;
                        chapitre.nodes = new Array();
                        chapitre.position = position;
                        cours.slide[position++] = idP;
                         //console.log(chapitre);
                    }
                    
                    if(titreParagraphe !== "NULL" && titreParagraphe !== lasttitreParagraphe)
                    {
                        boolparagraphe = false;
                        //$('<ul id='+idP.slice(0,5)+'  value = '+idP+' >'+titreParagraphe+'</ul>').appendTo('#'+idP.slice(0,3));
                        lasttitreParagraphe = titreParagraphe;
                        lastid = idP.slice(0,3);
                        paragraphe = new Object();
                        chapitre.nodes[compteurparagraphe++] = paragraphe;
                        paragraphe.text = titreParagraphe;
                        paragraphe.nodes = new Array();
                        paragraphe.position = position;
                        cours.slide[position++] = idP;
                        //console.log(paragraphe);
                    }
                    if(titre !== "NULL" && titre !== lasttitre && titre !== " ")
                    {
                        bool = false;
                      //  $('<ul id='+idP.slice(0,7)+' value = '+idP+' >'+titre+'</ul>').appendTo('#'+idP.slice(0,5));
                        lasttitre = titre;
                        notion = new Object();
                        paragraphe.nodes[compteur++] = notion;
                        notion.text = titre;
                        notion.position = position;
                        cours.slide[position++] = idP;
                        //console.log(notion);
                    }
                });
                console.log(cours);
                nextNotion(5);
                nextNotion(21);
                previousNotion(2);
                previousNotion(10);
                previousNotion(20);
                presentNotion(22);
                presentNotion(2);
                previousNotion(18);
            });
        }
            
    }); 
});
 

/**
 * La fonction qui retourne le fichier xml de la notion suivante à celle en cours
 * @param {type} position
 * @returns {undefined}
 */
function nextNotion(position)
{
    var pos = position + 1;
   goToNotion(pos);
}

/**
 * La fonction qui retourne le fichier xml de la notion courante
 * @param {type} pos
 * @returns {undefined}
 */
function presentNotion(pos)
{
    if(goToNotion(pos + 1) === null)
    {
        console.log("disable next");
    }
    if(goToNotion(pos - 1) === null)
    {
        console.log("disable previous");
    }
}

/**
 * la fonction qui retourne le nom du fichier xml de la notion précedente à celle en cours
 * @param {type} position
 * @returns {undefined}
 */
function previousNotion(position)
{
    var pos = position - 1;
    goToNotion(pos);
}

function goToNotion(pos)
{
    if(cours.slide.hasOwnProperty(pos))
    {
        
        console.log("Notion_"+cours.slide[pos]+".xml");
        return "Notion_"+cours.slide[pos]+".xml";
    }
    else
    {
        return null;
    }
}

 
function changeTitrePartie(element)
    {
        var titre = element.attr('titrePartie');
        //alert(titre + "****"+titrePartie);
        if(titrePartie !== titre && titre !== " ")
        {
            compteurchapitre = 0;
            return titre;
        }
        else
        {
            lasttitrePartie = titrePartie;
            return "NULL";
            
        }
    }

function getTitrePartie(element)
{
     if(boolpartie)
    {
        titrePartie = $(element).attr('titrePartie');
        //alert('ok');
    }
    else
    {
        titrePartie = changeTitrePartie($(element));
    }
                    
}

function changeTitreChapitre(element)
    {
        var titre = element.attr('titreChapitre');
       // alert(titre + "****"+titreChapitre);
        if(titreChapitre !== titre && titre !== " ")
        {
            compteurparagraphe = 0;
            return titre;
        }
        else
        {
            lasttitreChapitre = titreChapitre;
            return "NULL";
            
        }
    }

function getTitreChapitre(element)
{
     if(boolchapitre)
    {
        titreChapitre = $(element).attr('titreChapitre');
        //alert('ok');
    }
    else
    {
        titreChapitre = changeTitreChapitre($(element));
        
    }
                    
}

function changeTitreParagraphe(element)
    {
        var titre = element.attr('titreParagraphe');
        //alert(titre + "****"+titreParagraphe);
        if(titreParagraphe !== titre && titre !== " ")
        {
            compteur = 0;
            return titre;
        }
        else
        {
            lasttitreParagraphe = titreParagraphe;
            return "NULL";
            
        }
    }

function getTitreParagraphe(element)
{
     if(boolparagraphe)
    {
        //alert('association');
        titreParagraphe = $(element).attr('titreParagraphe');
        //alert('ok');
    }
    else
    {
        joy = idP;
        if(lastid !== joy.slice(0,3))
        {
            titreParagraphe = "NULL";
        }
        titreParagraphe = changeTitreParagraphe($(element));
    }
                    
}

function changeTitre(element)
    {
        var tit = element.attr('titre');
        //alert(titre + "****"+titre);
        if(titre !== tit && tit !== " ")
        {
            return tit;
        }
        else
        {
            lasttitre = titre;
            return "NULL";
            
        }
    }

function getTitre(element)
{
     if(bool)
    {
        //alert('association');
        titre = $(element).attr('titre');
        //alert('ok');
    }
    else
    {
        titre = changeTitre($(element));
    }
                    
}

    array = new Array();
                array["1"] = {
            text: "Analyse de donnÃ©es",
            nodes : [
                {
                    text: "Rappels",
                    nodes : [
                        {
                            text : "ProbabilitÃ©s",
                            nodes : [
                                {
                                    text : "Espaces probabilisÃ©s"
                                },
                                {
                                    text : "ProbabilitÃ©s conditionnelles"
                                },
                                {
                                    text : "Eevnements indÃ©pendants"
                                }
                            ]
                        },
                        {
                            text : "Variables alÃ©atoires",
                            nodes : [
                                {
                                    text : "Loi d'une variable alÃ©atoire"
                                },
                                {
                                    text : "Variables alÃ©atoires indÃ©pendantes"
                                },
                                {
                                    text : "ThÃ©orÃ¨me central-limite"
                                },
                                {
                                    text : "Lois des grands nombres"
                                },
                                {
                                    text : "Convergence d'une suites de V.A"
                                }
                            ]
                        },
                        {
                            text : "Estimations statistiques",
                            nodes : [
                                {
                                    text : "Estimation ponctuelle"
                                },
                                {
                                    text : "Estimation par intervalle de confiance"
                                }
                            ]
                        }

                    ]
                },
                {
                    text: "Le cadre de l'apprentissage supervisÃ©",
                    nodes : [
                        {
                            text : "Introduction",
                        },
                        {
                            text : "PrÃ©dicteur",
                            nodes : [
                                {
                                    text : "QualitÃ©"
                                }
                            ]
                        },
                        {
                            text : "RÃ©gresseurs et classifieurs optimaux",
                        },
                        {
                            text : "Quelques algorithmes d'apprentissage supervisÃ©",
                            nodes : [
                                {
                                    text : "k plus proches voisins"
                                },
                                {
                                    text : "Par noyau"
                                },
                                {
                                    text : "Par partition"
                                }
                            ]
                        },
                        {
                            text : "Minimisation du risque empirique",
                            nodes : [
                                {
                                    text : "Notion de critÃ¨re pÃ©nalisÃ© pour la sÃ©lection de modÃ¨le"
                                }
                            ]
                        }
                    ]
                },
                {
                    text: "RÃ©gression linÃ©aire multiple",
                    nodes : [
                        {
                            text : "Estimation par les moindres carrÃ©es",
                        },
                        {
                            text : "Le modÃ¨le linÃ©aire gaussien",
                            nodes : [
                                {
                                    text : "Estimation du maximum de vraisemblance"
                                },
                                {
                                    text : "Tests de sous-modÃ¨les"
                                },
                                {
                                    text : "SÃ©lection de variables"
                                },
                                {
                                    text : "Validation du modÃ¨le"
                                }
                            ]
                        }
                    ]
                },
                {
                    text: "MÃ©thodes linÃ©aires pour la classification supervisÃ©e",
                    nodes : [
                        {
                            text : "RÃ©gression logistique"
                        },
                        {
                            text : "Analyse discriminante linÃ©aire"
                        },
                        {
                            text : "Introduction aux SVM ('SÃ©parateurs Ã  vaste marge')"
                        }
                    ]
                },
                {
                    text: "Quelques mÃ©thodes d'apprentissage par moyennage local",
                    nodes : [
                        {
                            text : "Principe"
                        },
                        {
                            text : "Algorithme des k-plus proches voisins"
                        },
                        {
                            text : "Algorithme par noyau"
                        },
                        {
                            text : "Algorithme par partionnement"
                        }
                    ]
                }
            ]
        };
       // JSON.stringify(array, null,2); 
    affiche(array);

function affiche(arr)
{
    for(var i in arr[0])
    {
     
         console.log(i);
     
    }
}