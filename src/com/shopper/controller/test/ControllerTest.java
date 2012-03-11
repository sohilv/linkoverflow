package com.shopper.controller.test;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class ControllerTest {

	public static void main(String[] args) {
		
		readFromURL("http://localhost:8888/json");
		
	}
	
	public static void readFromURL(String uri)
    {
        try
        {
            URL url = new URL( uri );
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.addRequestProperty("Accept", "text/plain");
            
            connection.setDoInput(true);
            InputStream inStream = connection.getInputStream();
            BufferedReader input =
            new BufferedReader(new InputStreamReader(inStream));
    
            String line = "";
            while ((line = input.readLine()) != null)
            System.out.println(line);
        }
        catch (Exception e)
        {
            System.out.println(e.toString());
        }
    }
}
