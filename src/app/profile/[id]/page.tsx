'use client'
import React, { useEffect, useState, useRef } from 'react'
import { Skeleton } from '@nextui-org/react'
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
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      try {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
          .then(response => response.json())
          .then(data => {
            setUser(data)
          })
      } catch (error) {
        console.error(error)
      }
    }
  }, [id])

  useEffect(() => {
    if (user && mapRef.current) {
      const marker = new Feature({
        geometry: new Point(fromLonLat([parseFloat(user.address.geo.lng), parseFloat(user.address.geo.lat)]))
      });
      const map = new Map({
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
          center: fromLonLat([parseFloat(user.address.geo.lng), parseFloat(user.address.geo.lat)]),
          zoom: 4
        })
      });
      map.updateSize();
    }
  }, [user, mapRef])

  return (
    <div className={`min-h-screen p-6 grid grid-cols-2 gap-4 ${theme === 'light' ? 'bg-white text-black' : 'bg-slate-900 text-slate-300'}`}>
      <div className="col-span-1">
        <Card className={`shadow-lg rounded-lg ${theme === 'light' ? 'bg-white' : 'bg-slate-800 text-slate-300'}`}>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              {user ? user.name : <Skeleton className="rounded-lg"><div className="h-3 w-full rounded-lg bg-secondary"></div></Skeleton>}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              {user ? user.username : <Skeleton className="rounded-lg"><div className="h-3 w-full rounded-lg bg-secondary"></div></Skeleton>}
            </CardDescription>
            <CardDescription>
              {user ? user.email : <Skeleton className="rounded-lg"><div className="h-3 w-full rounded-lg bg-secondary"></div></Skeleton>}
            </CardDescription>
            <CardDescription>
              {user ? user.phone : <Skeleton className="rounded-lg"><div className="h-3 w-full rounded-lg bg-secondary"></div></Skeleton>}
            </CardDescription>
            <h2 className="font-bold">Website</h2>
            <CardDescription>
              {user ? user.website : <Skeleton className="rounded-lg"><div className="h-3 w-full rounded-lg bg-secondary"></div></Skeleton>}
            </CardDescription>
            <h2 className="font-bold">Address</h2>
            <CardDescription>
              {user ? `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}` : <Skeleton className="rounded-lg"><div className="h-3 w-full rounded-lg bg-secondary"></div></Skeleton>}
            </CardDescription>
            <h2 className="font-bold">Company</h2>
            <CardDescription>
              {user ? user.company.name : <Skeleton className="rounded-lg"><div className="h-3 w-full rounded-lg bg-secondary"></div></Skeleton>}
            </CardDescription>
            <CardDescription>
              {user ? user.company.catchPhrase : <Skeleton className="rounded-lg"><div className="h-3 w-full rounded-lg bg-secondary"></div></Skeleton>}
            </CardDescription>
            <CardDescription>
              {user ? user.company.bs : <Skeleton className="rounded-lg"><div className="h-3 w-full rounded-lg bg-secondary"></div></Skeleton>}
            </CardDescription>
          </CardContent>
        </Card>
      </div>
      <div className="col-span-1 h-screen max-h-[600px]" ref={mapRef}>
      </div>
    </div>
  )
}
export default Profile