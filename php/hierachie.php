<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$fichier = './cours/metadata.xml';
        $xml = simplexml_load_file($fichier);
        $array = array();
        $depart = $xml['titreCours'];

        $array["text"] = (string)$depart;
        $array["nodes"] = array();
        $array["slide"] = array();
        
        $boolpartie = true;
        $idP = "";
        $titrePartie = "";
        $lasttitrePartie = "";
        $boolchapitre = true;
        $titreChapitre = "";
        $lasttitreChapitre = "";
        $boolparagraphe = true;
        $titreParagraphe = "";
        $lasttitreParagraphe = "";
        $bool = true;
        $titres = "";
        $lasttitre = "";
        $lastid = "";
        $compteurpartie = 0;
        $compteurchapitre = 0;
        $compteurparagraphe = 0;
        $compteur = 0;
        $position = 0;
        $partie = array();       
        $chapitre = array();
        $paragraphe = array();
        $notion = array();
        
        $nodes = $xml->xpath('//metadata/notion');
        foreach($nodes as $node) {  
            // attention, l'appel à String est case sensitive !  
            $titrePartie = $lasttitrePartie;
            $titreChapitre = $lasttitreChapitre;
            $titreParagraphe = $lasttitreParagraphe;
            $titres = $lasttitre;
            $idP = (string)($node['id']);
            
            
            getTitrePartie($node);
            getTitreChapitre($node);
            getTitreParagraphe($node);
            getTitre($node);

            
            if($titrePartie != "NULL" && $titrePartie != $lasttitrePartie)
            {
                echo 'bon ici';
                $boolpartie = false;
                //$('<ul id='+idP.slice(0,1)+'  value = '+idP+' >'+titrePartie+'</ul>').appendTo('#ulist');
                $lasttitrePartie = $titrePartie;
                $partie = array();
                $partie['text'] = $titrePartie;
                $partie['nodes'] = array();
                $partie['position'] = (string)$position++;
                array_push($array['slide'],$idP);
                $array["nodes"][$compteurpartie++] = $partie;
                
                 //console.log(partie);
            }
                    
            if($titreChapitre != "NULL" && strcmp((string)$titreChapitre, (string)$lasttitreChapitre) != 0)
            {
                $boolchapitre = false;
                //$('<ul id='+idP.slice(0,3)+' value = '+idP+' >'+titreChapitre+'</ul>').appendTo('#'+idP.slice(0,1));
                $lasttitreChapitre = $titreChapitre;
                unset($chapitre);
                $chapitre['text'] = (string)$titreChapitre;
                $chapitre['nodes'] = array();
                $chapitre['position'] = (string)$position++;
                
                array_push($array['slide'],$idP);
                $partie["nodes"][$compteurchapitre++] = $chapitre;
                
                if($compteurpartie >= 1)
                {
                    $array["nodes"][$compteurpartie - 1] = $partie;
                }
                 //console.log(chapitre);
            }

            if($titreParagraphe != "NULL" && strcmp((string)$titreParagraphe, (string)$lasttitreParagraphe) != 0)
            {
                $boolparagraphe = false;
                //$('<ul id='+idP.slice(0,5)+'  value = '+idP+' >'+titreParagraphe+'</ul>').appendTo('#'+idP.slice(0,3));
                $lasttitreParagraphe = $titreParagraphe;
                $lastid = substr((string)$idP,0,3);
               
                unset($paragraphe);
                $paragraphe['text'] = (string)$titreParagraphe;
                $paragraphe['nodes'] = array();
                $paragraphe['position'] = (string)$position++;
                array_push($array['slide'],$idP);
                $chapitre["nodes"][$compteurparagraphe++] = $paragraphe;
                
                if($compteurchapitre >= 1)
                {
                    $partie["nodes"][$compteurchapitre - 1] = $chapitre;
                }
                if($compteurpartie >= 1)
                {
                    $array["nodes"][$compteurpartie - 1] = $partie;
                }
                //console.log(paragraphe);
            }
            
            
            if($titres != "NULL" && strcmp($titres, $lasttitre) != 0  && strcmp($titres, " ") != 0)
            {
                $bool = false;
              //  $('<ul id='+idP.slice(0,7)+' value = '+idP+' >'+titre+'</ul>').appendTo('#'+idP.slice(0,5));
                $lasttitre = $titres;
              
                unset($notion);
                $notion['text'] = (string)$titres;
                $notion['nodes'] = array();
                $notion['position'] = (string)$position++;
                array_push($array['slide'],$idP);
                $paragraphe["nodes"][$compteur++] = $notion;
                
                if($compteurparagraphe >= 1)
                {
                    $chapitre["nodes"][$compteurparagraphe - 1] = $paragraphe;
                }
                if($compteurchapitre >= 1)
                {
                    $partie["nodes"][$compteurchapitre - 1] = $chapitre;
                }
                if($compteurpartie >= 1)
                {
                    $array["nodes"][$compteurpartie - 1] = $partie;
                }
                //console.log(notion);
            }
            
            //array_push($array['nodes'],(string)($node['titrePartie']));  
          }  
        //print_r($xml);
          
          
            function changeTitrePartie($element)
                {
                    $titre = $element['titrePartie'];
                    //alert(titre + "****"+titrePartie);
                    global $titrePartie,$compteurchapitre,$lasttitrePartie;
                    if(strcmp($titrePartie, $titre) != 0  && strcmp($titre, " ") != 0)
                    {
                        $compteurchapitre = 0;
                        return titre;
                    }
                    else
                    {
                        $lasttitrePartie = $titrePartie;
                        return "NULL";

                    }
                }
          
          function getTitrePartie($element)
            {
              global $boolpartie,$titrePartie;
                 if($boolpartie)
                {
                    $titrePartie = (string)$element['titrePartie'];
                    //alert('ok');
                }
                else
                {
                    $titrePartie = changeTitrePartie($element);
                }

            }
            

        function changeTitreChapitre($element)
            {
                $titre = $element['titreChapitre'];
                global $titreChapitre,$compteurparagraphe,$lasttitreChapitre;
               // alert(titre + "****"+titreChapitre);
                if(strcmp($titreChapitre, $titre) != 0  && strcmp($titre, " ") != 0)
                {
                    $compteurparagraphe = 0;
                    return $titre;
                }
                else
                {
                    $lasttitreChapitre = $titreChapitre;
                    return "NULL";

                }
            }

        function getTitreChapitre($element)
        {
            global $boolchapitre,$titreChapitre;
             if($boolchapitre)
            {
                $titreChapitre = $element['titreChapitre'];
                //alert('ok');
            }
            else
            {
                $titreChapitre = changeTitreChapitre($element);

            }

        }


        function changeTitreParagraphe($element)
            {
                $titre = $element['titreParagraphe'];
                global $titreParagraphe,$lasttitreParagraphe,$compteur;
                //alert(titre + "****"+titreParagraphe);
                if(strcmp($titreParagraphe, $titre) != 0  && strcmp($titre, " ") != 0)
                {
                    $compteur = 0;
                    return $titre;
                }
                else
                {
                    $lasttitreParagraphe = $titreParagraphe;
                    return "NULL";

                }
            }

        function getTitreParagraphe($element)
        {
            global $boolparagraphe,$lastid,$idP,$titreParagraphe;
             if($boolparagraphe)
            {
                //alert('association');
            $titreParagraphe = $element['titreParagraphe'];
                //alert('ok');
            }
            else
            {
                $joy = $idP;
                if(strcmp($lastid , substr((string)$joy,0,3)) != 0)
                {
                    $titreParagraphe = "NULL";
                }
                $titreParagraphe = changeTitreParagraphe($element);
            }

        }
        
        
        function changeTitre($element)
        {
            $tit = $element['titre'];
            global $titres,$lasttitre;
            //alert(titre + "****"+titre);
            if(strcmp($titres, $tit) != 0  && strcmp($tit, " ") != 0)
            {
                return $tit;
            }
            else
            {
                $lasttitre = $titres;
                return "NULL";

            }
        }

        function getTitre($element)
        {
            global $bool,$titres;
            
             if($bool)
            {
                //alert('association');
                $titres = $element['titre'];
                //alert('ok');
            }
            else
            {
                $titres = changeTitre($element);
            }

        }
        
