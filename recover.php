<?php
   
   $myFile = "data/restaurants.json";
   $arr_data = array(); // create empty array
   $residremove = (int) $_POST['resid2'];
  try
  {
	   //Get form data
	   

	   //Get data from existing json file
	   $jsondata = file_get_contents($myFile);
	   
	   // converts json data into array
	   $arr_data = json_decode($jsondata, true);

	   $arrlength = count($arr_data['restaurants']);
	//    echo $arrlength;

	//    $formdata = 'display'=> 'none';
	
    for ($i = 0 ; $i < $arrlength ; $i ++){
		if($arr_data['restaurants'][$i]['id'] == $residremove){
		 $arr_data['restaurants'][$i]['display']="block";
		}
		
	}
	   // Push user data to array
	//    array_push($arr_data['restaurants'][$residremove],$formdata);

       //Convert updated array to JSON
	   $jsondata = json_encode($arr_data, JSON_PRETTY_PRINT);

	//    echo '<pre>';
	//    print_r($arr_data['restaurants']);
	//    echo '</pre>';
	   
	   //write json data into data.json file
	   if(file_put_contents($myFile, $jsondata)) {
	        echo 'Data successfully Removed';
	    }
	   else 
	        echo "error";

   }
   catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
   }

?>