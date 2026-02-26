import React from 'react'
import GaugeChart from './GaugeChart'

const Speedometer = ({ title, description, value }) => {
  return (
    <div className="border border-[#9CA3AF] rounded-md px-2 bg-[#FFFFFF] shadow-sm">
      <h3 className="text-lg font-bold text-[#1E3A8A] mb-2">{title}</h3>
      <p className="text-[12px] text-[#111827] leading-relaxed mb-2 ">{description}</p>
      <GaugeChart value={value} />
    </div>
  )
}

export default Speedometer
