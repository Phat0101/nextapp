'use client'
import React, { useEffect, useState, useRef } from 'react'
import { ThemeContext } from '@/context/ThemeContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Contact from '@/app/contact';

const Profile = ({ params }: { params: any }) => {
  const id = params.id;
  const [user, setUser] = useState<Contact>()
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  const mapRef = useRef();

  useEffect(() => {
    if (id) {
      try {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
          .then(response => response.json())
          .then(data => {
            setUser(data)
            if (mapRef.current) {
              const marker = new Feature({
                geometry: new Point(fromLonLat([parseFloat(data.address.geo.lng), parseFloat(data.address.geo.lat)]))
              });
              new Map({
                target: mapRef.current,
                layers: [
                  new TileLayer({
                    source: new OSM()
                  }),
                  new VectorLayer({
                    source: new VectorSource({
                      features: [marker]
                    })
                  })
                ],
                view: new View({
                  center: fromLonLat([parseFloat(data.address.geo.lng), parseFloat(data.address.geo.lat)]),
                  zoom: 4
                })
              });
            }
          })
      } catch (error) {
        console.error(error)
      }
    }
  }, [id])

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className={`p-6 grid grid-cols-2 gap-4 ${theme === 'light' ? 'bg-white text-black' : 'bg-slate-900 text-slate-300'}`}>
      <div className="col-span-1">
        <Card className={`shadow-lg rounded-lg ${theme === 'light' ? 'bg-white' : 'bg-slate-800 text-slate-300'}`}>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">{user.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{user.username}</CardDescription>
            <CardDescription>{user.email}</CardDescription>
            <CardDescription>{user.phone}</CardDescription>
            <CardDescription>{user.website}</CardDescription>
            <h2 className="font-bold">Address</h2>
            <CardDescription>{`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}</CardDescription>
            <h2 className="font-bold">Company</h2>
            <CardDescription>{user.company.name}</CardDescription>
            <CardDescription>{user.company.catchPhrase}</CardDescription>
            <CardDescription>{user.company.bs}</CardDescription>
          </CardContent>
        </Card>
      </div>
      <div className="col-span-1 h-screen max-h-[800px]" ref={mapRef}>
      </div>
    </div>
  )
}
export default Profile