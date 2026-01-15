import { useState, useEffect } from 'react'
import axios from 'axios'
import TacticalMap from './components/TacticalMap' // <--- Import the Map

interface Unit {
    id: number;
    callsign: string;
    unitType: string;
    latitude: number;
    longitude: number;
    batteryLevel: number;
    status: string;
}

function App() {
    const [units, setUnits] = useState<Unit[]>([])

    useEffect(() => {
        const fetchTelemetry = async () => {
            try {
                const response = await axios.get<Unit[]>('http://localhost:8080/api/units')
                setUnits(response.data)
            } catch (error) {
                console.error("Signal Lost:", error)
            }
        }

        fetchTelemetry()
        const interval = setInterval(fetchTelemetry, 2000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="p-8 min-h-screen bg-black text-green-500 font-mono">
            <h1 className="text-4xl font-bold border-b-2 border-green-500 pb-4 mb-8 tracking-widest flex justify-between items-center">
                <span>PROJECT OVERWATCH // TACTICAL FEED</span>
                <span className="text-sm font-normal animate-pulse text-red-500">LIVE CONNECTION</span>
            </h1>

            <div className="mb-8">
                <TacticalMap units={units} />
            </div>

            <h2 className="text-xl mb-4 text-green-400 border-l-4 border-green-600 pl-3">UNIT STATUS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {units.map((unit) => (
                    <div key={unit.id} className="border border-green-800 bg-gray-900/40 p-6 rounded hover:bg-gray-900/60 transition-colors">

                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-white">{unit.callsign}</h2>
                            <span className={`px-2 py-1 text-xs rounded border ${unit.unitType === 'DRONE' ? 'border-green-500 text-green-400' : 'border-blue-500 text-blue-400'}`}>
                {unit.unitType}
              </span>
                        </div>

                        <div className="space-y-2 text-sm text-gray-400">
                            <div className="flex justify-between">
                                <span>LAT: {unit.latitude.toFixed(5)}</span>
                                <span>LNG: {unit.longitude.toFixed(5)}</span>
                            </div>

                            <div className="w-full bg-gray-800 h-1 mt-2">
                                <div
                                    className={`h-full transition-all duration-500 ${unit.batteryLevel < 20 ? 'bg-red-500' : 'bg-green-500'}`}
                                    style={{ width: `${unit.batteryLevel}%` }}
                                ></div>
                            </div>
                            <p className="text-right text-xs mt-1 text-green-300">PWR: {unit.batteryLevel}%</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default App