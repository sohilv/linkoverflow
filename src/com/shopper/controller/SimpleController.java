	package com.shopper.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.shopper.common.Constants;

@Controller
public class SimpleController {

	@RequestMapping("/")
	public ModelAndView root() {
		ModelAndView model = new ModelAndView();
		model.addObject(Constants.OBJ_PAGE_MODULE, Constants.OBJ_MODULE_HOME);
		model.setViewName("static/container-app");
		return model;
	}
	
	@RequestMapping("/home")
	public ModelAndView simple() {
		ModelAndView model = new ModelAndView();
		model.addObject(Constants.OBJ_PAGE_MODULE, Constants.OBJ_MODULE_HOME);
		model.setViewName("home");
		return model;
	}
	
	

}
