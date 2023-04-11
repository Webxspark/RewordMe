<?php
include './db.php';
include './auth.php';
$Auth = new Auth;
$data = [];
$length = 8;
$fetchResp = true;
//calculate the execution time
$startTime = microtime(true);
if ($_REQUEST) {
    if (isset($_REQUEST['sentence'])) {
        if (isset($_REQUEST['key'])) {
            $APIKEY = htmlspecialchars($_REQUEST['key']);
            $AuthCheck = $Auth->CheckAPIKEY($conn, $APIKEY);
            if ($AuthCheck) {
                $ValidateKeyCredits = $Auth->ValidateKeyCredits($conn, $APIKEY);
                if ($ValidateKeyCredits) {
                    if ($APIKEY === "com.beta.reword-me.webxspark.app") {
                        //check if the request is from same domain for api security
                        $domain = $Auth->getDomainWithSSL();
                        if ($domain !== "https://rewordme.webxspark.com" && $domain !== "http://localhost") {
                            $data['error'] = "Access forbidden! Error code: 001";
                            $fetchResp = false;
                        }
                        if ($fetchResp === true) {
                            if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && ($_SERVER['HTTP_X_REQUESTED_WITH'] !== 'XMLHttpRequest')) {
                                $data['error'] = "Access forbidden! Error code: 002";
                                $fetchResp = false;
                            }
                        }
                        //checking if the same ip adress sent request more than 3 times to make them login
                        if (!$Auth->isLoggedIn()) {
                            $myIp = htmlspecialchars($Auth::fetch_ip());
                            $stmt = $conn->prepare("SELECT * FROM requests WHERE ip=?");
                            $stmt->bind_param('s', $myIp);
                            $stmt->execute();
                            $resp = $stmt->get_result();
                            $noLoginRequests = 0;
                            while ($details = mysqli_fetch_assoc($resp)) {
                                if ((int)$details['isLoggedIn'] === 0) {
                                    $noLoginRequests += 1;
                                }
                            }
                            if ($noLoginRequests >= 3) {
                                $fetchResp = false;
                                $data['error'] = "Access denied. Please login to continue!";
                                $data['action'] = "auth.login";
                            }
                        }
                    }


                    if ($fetchResp) {
                        $rephrase = htmlspecialchars($_REQUEST['sentence']);
                        if (isset($_REQUEST['length'])) {
                            $length = (int)htmlspecialchars($_REQUEST['length']);
                        }
                        $curl = curl_init();

                        curl_setopt_array($curl, array(
                            CURLOPT_URL => "https://example.com/",
                            CURLOPT_RETURNTRANSFER => true,
                            CURLOPT_ENCODING => "",
                            CURLOPT_MAXREDIRS => 10,
                            CURLOPT_TIMEOUT => 30,
                            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                            CURLOPT_CUSTOMREQUEST => "POST",
                            CURLOPT_POSTFIELDS => "s=$rephrase&size=$length",
                        ));

                        $response = curl_exec($curl);
                        $response = json_decode($response, true);
                        $sentences = [];
                        if (isset($response['sentences'])) {
                            foreach ($response['sentences'] as $key => $val) {
                                unset($response['sentences'][$key]['Frequency']);
                                unset($response['sentences'][$key]['Id']);
                                unset($response['sentences'][$key]['Classification']);
                                $sentences[$key] = $response['sentences'][$key]['Sentence'];
                            }
                        }
                        $response['sentences'] = $sentences;
                        $err = curl_error($curl);

                        curl_close($curl);

                        if ($err) {
                            $data['error'] = "EndPointReqError #:" . $err;
                        } else {
                            $data['response'] = $response;
                        }

                        //update the credits
                        $stmt = $conn->prepare("UPDATE auth SET credits = credits - 1 WHERE auth_key = ?");
                        $stmt->bind_param('s', $APIKEY);
                        $stmt->execute();

                        //insert analytics details
                        $userName  = $Auth->fetchAPIKEYData($conn, $APIKEY)['username'];
                        $ip = $Auth::fetch_ip();
                        $endTime = microtime(true);
                        $reqRespTime = ($endTime - $startTime);
                        $isLoggedIn = $Auth->isLoggedIn() ? 1 : 0;
                        $stmt = $conn->prepare("INSERT INTO requests(username,sentence,max_resp_time,ip, isLoggedIn) VALUES (?,?,?,?,?)");
                        $stmt->bind_param('sssss', $userName, $rephrase, $reqRespTime, $ip, $isLoggedIn);
                        $stmt->execute();

                        $stmt = $conn->prepare("UPDATE analytics SET requests = requests + 1 WHERE id = 1");
                        $stmt->execute();
                    }
                } else {
                    $data['error'] = "No credits left! Your free trial credits are over!";
                }
            } else {
                $data['error'] = "Access forbidden! Invalid API key!";
            }
        } else {
            $data['error'] = "Access forbidden! No API key provided!";
        }
    } else {
        $data['error'] = "No rephrase text provided!";
    }
} else {
    header("Location: https://ai.webxspark.com/reword-me");
}
$endTime = microtime(true);
$executionTime = ($endTime - $startTime);
$data['execution_time'] = $executionTime;
header("Content-type: application/json");
echo json_encode($data, JSON_PRETTY_PRINT);
