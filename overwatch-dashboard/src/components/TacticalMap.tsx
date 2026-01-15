import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import type {LatLngExpression} from "leaflet";

interface Unit {
    id: number;
    callsign: string;
    unitType: string;
    latitude: number;
    longitude: number;
    batteryLevel: number;
    status: string;
}

interface MapProps {
    units: Unit[];
}

const TacticalMap = ({ units }: MapProps) => {

    const defaultCenter: LatLngExpression = [28.6139, 77.2090]

    return (
        <div className="h-[400px] w-full border-2 border-green-900 rounded-lg overflow-hidden relative shadow-[0_0_15px_rgba(0,255,0,0.3)]">

            <MapContainer
                center = {defaultCenter}
                zoom = {15}
                style = {{ height: "100%", width: "100%", background: "#0a0a0a"}}
                >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
                />

                {units.map(unit => (
                    <CircleMarker
                    key={unit.id}
                    center={[unit.latitude, unit.longitude]}
                    radius= {10}
                    pathOptions={{
                        color: unit.unitType === 'DRONE' ? '#10b981' : '#3b82f6',
                        fillColor: unit.unitType === 'DRONE' ? '#10b981' : '#3b82f6',
                        fillOpacity: 0.7,
                    }}
                    >
                        <Popup>
                            <div className="text-gray-900 font-bold">
                                <p>{unit.callsign}</p>
                                <p className="text-xs">BATTERY: {unit.batteryLevel}</p>
                            </div>
                        </Popup>
                    </CircleMarker>
                ))}
            </MapContainer>

            <div className="absolute top-2 right-2 z-[1000] bg-black/70 px-2 py-1 text-xs text-green-500 border border-green-500 rounded">
                SATELLITE LINK: ACTIVE
            </div>
        </div>
    )
}

export default TacticalMap;