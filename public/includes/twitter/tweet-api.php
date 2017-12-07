<script>
	(function ($) {
		// configure twitter slide
		var TwitterContentSlide = $('.my-tweets');
		if (TwitterContentSlide.length) {
		    TwitterContentSlide.bxSlider({
				mode: 'vertical',
			    auto: true,
				autoControls: false,
				controls: false,
				pager: false,
				autoHover: true, // hover pause 
			    minSlides: 3, // set number of item to show
			    slideMargin: 20 // set margin for each of item
			});    		
		};
	})(jQuery);
</script>


<?php 

/**
 * configure twitter api
 */

/* add your token */
$token = '3139137656-TWA1t7B8QFrgVAmA5xPfSJ1swaAOgAnNFuT1QO8';
/* add your token secret */
$token_secret = 'p2bNtHo17cqxwTo8zUywLvpsLIEIoA82axvKoyndbinp0';
/* add your consumer key */
$consumer_key = 'XoanmSoZzYK8y3y0dilIKbISn';
/* add your consumer secret */
$consumer_secret = 'tzflOLf3vjQ4mFuxqdW3LOKJMJ7eusDiJiZF8fQuoNiS1F8c3i';



$host = 'api.twitter.com';

$method = 'GET';

$path = '/1.1/statuses/user_timeline.json'; // api call path



$query = array( // query parameters

    'screen_name' => 'twitterapi',

    'count' => '10'

);



$oauth = array(

    'oauth_consumer_key' => $consumer_key,

    'oauth_token' => $token,

    'oauth_nonce' => (string)mt_rand(), // a stronger nonce is recommended

    'oauth_timestamp' => time(),

    'oauth_signature_method' => 'HMAC-SHA1',

    'oauth_version' => '1.0'

);



$oauth = array_map("rawurlencode", $oauth); // must be encoded before sorting

$query = array_map("rawurlencode", $query);



$arr = array_merge($oauth, $query); // combine the values THEN sort



asort($arr); // secondary sort (value)

ksort($arr); // primary sort (key)



// http_build_query automatically encodes, but our parameters

// are already encoded, and must be by this point, so we undo

// the encoding step

$querystring = urldecode(http_build_query($arr, '', '&'));



$url = "https://$host$path";



// mash everything together for the text to hash

$base_string = $method."&".rawurlencode($url)."&".rawurlencode($querystring);



// same with the key

$key = rawurlencode($consumer_secret)."&".rawurlencode($token_secret);



// generate the hash

$signature = rawurlencode(base64_encode(hash_hmac('sha1', $base_string, $key, true)));



// this time we're using a normal GET query, and we're only encoding the query params

// (without the oauth params)

$url .= "?".http_build_query($query);

$url=str_replace("&amp;","&",$url); //Patch by @Frewuill



$oauth['oauth_signature'] = $signature; // don't want to abandon all that work!

ksort($oauth); // probably not necessary, but twitter's demo does it



// also not necessary, but twitter's demo does this too

function add_quotes($str) { return '"'.$str.'"'; }

$oauth = array_map("add_quotes", $oauth);



// this is the full value of the Authorization line

$auth = "OAuth " . urldecode(http_build_query($oauth, '', ', '));



// if you're doing post, you need to skip the GET building above

// and instead supply query parameters to CURLOPT_POSTFIELDS

$options = array( CURLOPT_HTTPHEADER => array("Authorization: $auth"),

                  //CURLOPT_POSTFIELDS => $postfields,

                  CURLOPT_HEADER => false,

                  CURLOPT_URL => $url,

                  CURLOPT_RETURNTRANSFER => true,

                  CURLOPT_SSL_VERIFYPEER => false);



// do our business

$feed = curl_init();

curl_setopt_array($feed, $options);

$json = curl_exec($feed);

curl_close($feed);



$tweets = json_decode($json, true);

if($tweets && is_array($tweets)) { 

?>

		


<ul class="my-tweets">

	<?php foreach($tweets as $tweet) { ?>

			<li class="tweet-item slide">


				<p class="tweet_text">

					<?php

						$tweet_text = $tweet['text'];
						preg_match_all('#\bhttps?://[^\s()<>]+(?:\([\w\d]+\)|([^[:punct:]\s]|/))#', $tweet_text, $match);

						$tweet_text = preg_replace('/@([a-z0-9_]+)/i', '&nbsp;<a href="http://twitter.com/$1" target="_blank">@$1</a>&nbsp;', $tweet_text);

						$limit = 10;
						$excerpt = explode(' ', $tweet_text, $limit);
						array_pop($excerpt);
						$excerpt = implode(" ",$excerpt);

						echo $excerpt . ' <a target="_blank" href="http://twitter.com/'. $tweet['user']['screen_name'] .'/'.'statuses'.'/'. $tweet['id_str'].'">.....</a>';

						foreach ($match[0] as $url) {
							echo ' <a href="'.$url.'" target="_blank">'.$url.'</a> ';
						}

					?>
					


				</p>

				

				<?php $tweet_time = strtotime($tweet['created_at']); ?>

				<a href="http://twitter.com/<?php echo $tweet['user']['screen_name']; ?>/statuses/<?php echo $tweet['id_str']; ?>" class="themex_twt_date"><?php echo date("F d, Y", $tweet_time); ?></a>

			</li>

	<?php } ?>

</ul>


<?php } ?>


