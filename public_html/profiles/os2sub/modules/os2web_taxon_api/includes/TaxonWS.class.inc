<?php
/**
 * @file
 * TaxonWS.class.inc
 */

class TaxonWS {
  private $taxonServiceURL = "http://10.1.1.182/Taxon/taxon-ws.php";

  /*
   * A function which returns a JSON string representing the taxonomy call.
   * Takes a string as parameter (HTML text is also possible).
   */
  function getAsJSON($text, $number_results_returned) {
    if ($text == "test") {
      return '{"23.07.00":{"title":"Legitimation af borgere i almindelighed","exclusive":"1","hidden":"0","thresholdWeight":"5","thresholdCount":"1","thresholdCountUnique":"1","terms":{"legitimation":{"weight":5,"count":1,"firstpos":11019,"hits":{"legitimation":1},"requireTerm":"","excludeOnTerm":"","requireClass":"","excludeOnClass":"","required":"0","hidden":"0"}},"scoreCount":1,"scoreWeight":5,"scorePosition":11019,"scoreFirstPosition":1,"classificationMethod":"Full classification"},"02.00.05":{"title":"Midlertidig r\u00e5dighed over naboejendomme","exclusive":"0","hidden":"0","thresholdWeight":"5","thresholdCount":"1","thresholdCountUnique":"1","terms":{"naboejendom":{"weight":5,"count":1,"firstpos":14068,"hits":{"naboejendomme":1},"requireTerm":"","excludeOnTerm":"","requireClass":"","excludeOnClass":"","required":"0","hidden":"0"}},"scoreCount":1,"scoreWeight":5,"scorePosition":14068,"scoreFirstPosition":0,"classificationMethod":"Full classification"}}';
    }
    else {
      $text = preg_replace("/<\s*script[^>]*>[\s\S]*?<\/script[^>]*>/", " ", $text);
      $text = preg_replace("/<\s*style[^>]*>[\s\S]*?<\/style[^>]*>/", " ", $text);
      $text = preg_replace("/<\!--[\s\S]*?-->/", " ", $text);
      $text = preg_replace("/<[^>]*>/", " ", $text);
      $text = preg_replace("/\\n/", " ", $text);

      $text = html_entity_decode($text, ENT_COMPAT, 'UTF-8');
      $fields = array(
        'taxonomy' => urlencode("kle"),
        'text' => urlencode("$text"),
        'settings' => urlencode(json_encode(array("numberResultsReturned" => $number_results_returned)))
      );

      $fields_string = "";
      // url-ify the data for the POST.
      foreach ($fields as $key => $value) {
        $fields_string .= $key . '=' . $value . '&';
      }

      rtrim($fields_string, '&');

      // Open connection.
      $ch = curl_init();
      // Set the url, number of POST vars, POST data.
      curl_setopt($ch, CURLOPT_URL, $this->taxonServiceURL);
      curl_setopt($ch, CURLOPT_POST, count($fields));
      curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
      // Execute curl and return data.
      return curl_exec($ch);
    }
  }

  /*
   * Function which returns KLE IDs as an array.
   * Takes a string as parameter (HTML text is also possible).
   */
  function getIDs($text) {
    $json = $this->getAsJSON($text);
    $data = json_decode($json, TRUE);
    return array_keys($data);
  }

  /*
   * Function which returns KLE ID and names as an array.
   * Takes a string as parameter (HTML text is also possible).
   */
  function getNames($text, $number_results_returned) {
    $json = $this->getAsJSON($text, $number_results_returned);
    $data = json_decode($json, TRUE);
    $result = array();
    foreach ($data as $key => $value) {
      array_push($result, $key . ' ' . $value['title']);
    }
    return $result;
  }

}
