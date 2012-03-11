package com.shopper.db;

import java.beans.BeanInfo;
import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.List;

import com.google.appengine.api.datastore.EntityNotFoundException;
import com.googlecode.objectify.Key;
import com.googlecode.objectify.ObjectifyService;
import com.googlecode.objectify.Query;
import com.googlecode.objectify.helper.DAOBase;

public class ObjectifyDao<T> extends DAOBase
{
	private Class<T> clazz;

	/**
	 * We've got to get the associated domain class somehow
	 *
	 * @param clazz
	 */
	protected ObjectifyDao(Class<T> clazz)
	{
		this.clazz = clazz;
	}

	public Key<T> add(T entity)

	{
		Key<T> key = ofy().put(entity);
		return key;
	}

	public void delete(T entity)
	{
		ofy().delete(entity);
	}

	public void delete(Key<T> entityKey)
	{
		ofy().delete(entityKey);
	}

	public T get(Long id) throws EntityNotFoundException
	{
		T obj = ofy().get(this.clazz, id);
		return obj;
	}

	/**
	 * Convenience method to get an object matching a single property
	 *
	 * @param propName
	 * @param propValue
	 * @return T matching Object
	 */
	public T getByProperty(String propName, Object propValue)
	{
	
		Query<T> q = ObjectifyService.begin().query(clazz); // ObjectifyService.createQuery(clazz);
		q.filter(propName, propValue);
		T obj =  q.get(); //ofy().find(q).asSingle();
		return obj;
	}

	public List<T> listByProperty(String propName, Object propValue)
	{
		Query<T> q = ObjectifyService.begin().query(clazz); // ObjectifyService.createQuery(clazz);
		q.filter(propName, propValue);
		List<T> list =q.list(); //ofy().prepare(q).asList();
		return list;
	}

	public T getByExample(T u, String... matchProperties)
	{
		Query<T> q = ObjectifyService.begin().query(clazz); // ObjectifyService.createQuery(clazz);
		// Find non-null properties and add to query
		for (String propName : matchProperties)
		{
			Object propValue = getPropertyValue(u, propName);
			q.filter(propName, propValue);
		}
		T obj =  q.get(); //ofy().find(q).asSingle();
		return obj;
	}

	public List<T> listByExample(T u, String... matchProperties)
	{
		Query<T> q = ObjectifyService.begin().query(clazz); // ObjectifyService.createQuery(clazz);
		// Find non-null properties and add to query
		for (String propName : matchProperties)
		{
			Object propValue = getPropertyValue(u, propName);
			q.filter(propName, propValue);
		}
		List<T> list =q.list(); //ofy().prepare(q).asList();
		return list;
	}

	private Object getPropertyValue(Object obj, String propertyName)
	{
		BeanInfo beanInfo;
		try
		{
			beanInfo = Introspector.getBeanInfo(obj.getClass());
		}
		catch (IntrospectionException e)
		{
			throw new RuntimeException(e);
		}
		PropertyDescriptor[] propertyDescriptors = beanInfo.getPropertyDescriptors();
		for (PropertyDescriptor propertyDescriptor : propertyDescriptors)
		{
			String propName = propertyDescriptor.getName();
			if (propName.equals(propertyName))
			{
				Method readMethod = propertyDescriptor.getReadMethod();
				try
				{
					Object value = readMethod.invoke(obj, new Object[] {});
					return value;
				}
				catch (IllegalArgumentException e)
				{
					throw new RuntimeException(e);
				}
				catch (IllegalAccessException e)
				{
					throw new RuntimeException(e);
				}
				catch (InvocationTargetException e)
				{
					throw new RuntimeException(e);
				}
			}
		}
		return null;
	}

}