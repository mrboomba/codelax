package com.example.mrboomba.codelax;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.webkit.WebView;

public class login extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        WebView wv =(WebView)findViewById(R.id.web);
        wv.loadUrl("http://ec2-35-161-11-183.us-west-2.compute.amazonaws.com:8080/login/");


    }
}
