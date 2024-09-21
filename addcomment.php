<?php
   
   $myFile = "data/restaurants.json";
   $arr_data = array(); // create empty array
   $resid = (int) $_POST['comid'] ;
   

  try
  {
    $rating = (int) $_POST['userrate'];
	   //Get form data
	   $formdata = array(
         'name' => $_POST['username'],
         'date' => '1 sec ago',
         'rating' => $rating,
        'comments' => $_POST['usreview']


	   );

	   //Get data from existing json file
	   $jsondata = file_get_contents($myFile);
	   
	   // converts json data into array
	   $arr_data = json_decode($jsondata, true);

	   

	   echo  $resid;
	   echo '<br>';
	   $arrlength = count($arr_data['restaurants']);
	   for ($i = 0 ; $i < $arrlength ; $i ++){
		   if($arr_data['restaurants'][$i]['id'] == $resid){
			// print_r($arr_data['restaurants'][$i]);
			array_push($arr_data['restaurants'][$i]['reviews'],$formdata);
		   }
		   
	   }


	   // Push user data to array
	   

       //Convert updated array to JSON
	   $jsondata = json_encode($arr_data, JSON_PRETTY_PRINT);

	   
	//    print_r($arr_data['restaurants'][0]['reviews']);
	   
	   
	   //write json data into data.json file
	   if(file_put_contents($myFile, $jsondata)) {
	        echo 'Data successfully saved';
	    }
	   else 
	        echo "error";

   }
   catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
   }

?>