<div class="wrap">
  <img src="<?php echo plugin_dir_url( __FILE__ ) . 'assets/images/dark_logo.png'?>" style="margin-bottom: 10px;" height="50"/>

  <hr />
  <?php
    global $wpdb;
    $current_user = wp_get_current_user();
    $userEmail = '';
    if (wp_get_current_user() instanceof WP_User){
      if($registeredUser == ""){
        $registeredUser = wp_get_current_user()->user_email;
      }
      $userEmail = wp_get_current_user()->user_email;
    }
    if(array_key_exists('Submit',$_POST)) {
      if ( empty( $_POST["syra-ai-chatbot-user-password"] )){
        echo "<p> <b> <font color=red>Password field can not be blank!</font> </b> </p>";
      }
      else{
        $AI_Chatbot_tb_name = $wpdb->prefix . "syra_ai_chatbot_users"; 
        if ($current_user->has_cap('administrator')) {
          $results = $wpdb->get_results( "SELECT * FROM $AI_Chatbot_tb_name");
          if(!empty($results)){

            $wpdb->update($AI_Chatbot_tb_name, array(
              'user_password' => sanitize_text_field($_POST["syra-ai-chatbot-user-password"])
              ),
              array('user_email' => sanitize_email($_POST["syra-ai-chatbot-user-email"])),
              array('%s'),
              array('%s'));
          }
          else{
            
            $wpdb->insert($AI_Chatbot_tb_name, array(
              'user_email' => sanitize_email($_POST["syra-ai-chatbot-user-email"]),
              'user_password' => sanitize_text_field($_POST["syra-ai-chatbot-user-password"])
              ),
              array(
                '%s',
                '%s'
              )
            );
          }
          echo "<p> <font color=green>Now click on <b> Proceed to Syra </b> button to validate from https://chatbots.syra.ai/ </font> </p>";
          set_transient( 'ai_chatbot_password_set', sanitize_text_field($_POST["syra-ai-chatbot-user-password"]), 2 * 3600 );
        }
      }
        
    }

    else if(array_key_exists('Proceed',$_POST)) {
      if ( empty( $_POST["syra-ai-chatbot-user-password"] ) || empty(get_transient('ai_chatbot_password_set')) ){
        echo "<p> <font color=red>Click on <b> Save </b> button first to register!</font> </p>";
      }
      else{
        $url = 'https://chatbots.syra.ai/syraconsumer/login';
        $response = wp_remote_post( $url, array(
          'method' => 'POST',
          'timeout' => 45,
          'redirection' => 5,
          'httpversion' => '1.0',
          'blocking' => true,
          'headers' => array(),
          'body' => array( 'email' => sanitize_email($_POST["syra-ai-chatbot-user-email"]), 'password' => sanitize_text_field($_POST["syra-ai-chatbot-user-password"])),
          'cookies' => array()
          )
        );
        $json_body = json_decode($response['body'], TRUE);
        if($json_body["status"] == 200){

          set_transient( 'ai_chatbot_fname', $json_body["data"][0]["fName"], 2 * 3600 );
          set_transient( 'ai_chatbot_lname', $json_body["data"][0]["lName"], 2 * 3600 );
          set_transient( 'ai_chatbot_email', $json_body["data"][0]["email"], 2 * 3600 );
          set_transient( 'ai_chatbot_access_token', $json_body["access_token"], 2 * 3600 );
          set_transient( 'ai_chatbot_refresh_token', $json_body["refresh_token"], 2 * 3600 );
        }
        else{
          echo "<p> <b> <font color=red>Wrong Credentials!</font> </b> </p>";
          delete_transient( 'ai_chatbot_password_set');
        }
      }
    }

    else if(array_key_exists('Continue',$_POST)) {

      require_once plugin_dir_path( __FILE__ ) . 'templates/setup-wizard.php';
    }
    ?>

  <?php if (!isset($_COOKIE['access_token'])){ 
    ?>
  <div id="poststuff">
  <div id="post-body" class="metabox-holder columns-2">
    <div id="post-body-content">
      <div class="postbox">
        <div class="inside">
          <form action="admin.php?page=syraaichatbot_plugin" method="post">

            <div id="syra-ai-chatbot-instructions">
            <h3 class="syra-ai-chatbot-labels"><?php if (get_transient('ai_chatbot_access_token') == "") _e('Enter your credentials to get started: ', 'syra-ai-chatbot'); else _e('Welcome to Syra AI Chatbot: '.$userEmail, 'syra-ai-chatbot'); ?></h3>
            <p> <?php if (get_transient('ai_chatbot_access_token') == "") _e('If you are not an existing Syra AI Chatbot user<a href="https://chatbots.syra.ai/registration.html" target="_blank" class="button button-primary" style="margin: auto 15px; background-color: #208a46; border-color: #208a46; text-shadow: none; box-shadow: none;">Create a free account</a>', 'syra-ai-chatbot'); ?></p>
            </div>
            <h3 class="syra-ai-chatbot-labels" for="script"><?php if (get_transient('ai_chatbot_access_token') == "") _e('Chatbot Credentials:', 'syra-ai-chatbot'); else _e('Registered Email in Syra:', 'syra-ai-chatbot'); ?></h3>
            <textarea id="syra-ai-chatbot-plugin-email" style="width:100%;" rows="2" cols="50" name="syra-ai-chatbot-user-email" readonly="true"><?php echo esc_html($registeredUser); ?></textarea>
            <?php if (get_transient('ai_chatbot_access_token') == ""){ ?>
            <p> <?php _e('Password', 'syra-ai-chatbot'); ?> </p>
            <textarea id="syra-ai-chatbot-plugin-password" style="width:100%;" rows="2" cols="50" name="syra-ai-chatbot-user-password"><?php _e(get_transient( 'ai_chatbot_password_set'), 'syra-ai-chatbot'); ?></textarea>
            <?php } ?>
            <p class="submit">
            <?php if (get_transient('ai_chatbot_access_token') == ""){ ?>
              <input class="button button-primary" type="submit" name="Submit" id="Submit" value="<?php _e('Save', 'syra-ai-chatbot'); ?>"  style="padding: 0px 30px;font-size:15px;background-color: #2c6ac3;border-color: #2c6ac3;"/>
              <input class="button button-primary" type="submit" name="Proceed" id="Proceed" value="<?php _e('Proceed to Syra', 'syra-ai-chatbot'); ?>"  style="padding: 0px 30px;font-size:15px;background-color: #638abf;border-color: #638abf;"/>
            <?php } else{?>
              <input class="button button-primary" type="submit" name="Continue" id="Continue" value="<?php _e('Continue', 'syra-ai-chatbot'); ?>"  style="padding: 0px 30px;font-size:15px;background-color: #2c6ac3;border-color: #2c6ac3;"/>
              <?php }?>
            </p>
            <p><?php _e('<b>Note:</b> You can not use other email id except the wordpress one', 'syra-ai-chatbot'); ?></p>

          </form>
        </div>
    </div>
    </div>
    </div>
  </div>
  <?php }?>
</div>


<style>
  .syra-ai-chatbot-plugin-label {
    vertical-align: initial;
    margin-right: 5px;
  }
</style>

