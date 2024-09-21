<?php
   
   $myFile = "data/restaurants.json";
   $arr_data = array(); // create empty array

  try
  {
	   //Get form data
	   

	   //Get data from existing json file
	   $jsondata = file_get_contents($myFile);
	   
	   // converts json data into array
	   $arr_data = json_decode($jsondata, true);

	   $arrlength = count($arr_data['restaurants']) + 1;

	   for ($i = 0 ; $i < $arrlength ; $i ++){
		if($arr_data['restaurants'][$i]['id'] == $arrlength){
		 echo "found match";
		 $arrlength++;
		}
		
	}
	   echo $arrlength;

	   $formdata = array(
		'id'=> $arrlength,
		'display' => 'block',
		'name'=> $_POST['resname'],
		'place'=>$_POST['rescity'],
		'photograph'=>$_POST['resimg'],
		'address'=>$_POST['resaddress'],
		'latlng'=> array(
		   'lat'=> $_POST[lat],
		   'lng'=> $_POST[lng]
		),
		'type'=> $_POST['restype'],
		'operating_hours'=> array(
		  'Saturday'=>$_POST['sat'],
		  'Sunday'=>$_POST['sun'],
		  'Monday'=>$_POST['mon'],
		  'Tuesday'=>$_POST['tus'],
		  'Wednesday'=>$_POST['wed'],
		  'Thursday'=>$_POST['thu'],
		  'Friday'=>$_POST['fri']

		),
	   'reviews'=>array(
		  
	   ) 

	 );

	   // Push user data to array

	 
	   array_push($arr_data['restaurants'],$formdata);

       //Convert updated array to JSON
	   $jsondata = json_encode($arr_data, JSON_PRETTY_PRINT);

	//    echo '<pre>';
	//    print_r($arr_data['restaurants']);
	//    echo '</pre>';
	   
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