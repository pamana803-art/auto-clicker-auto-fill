import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

export function CarbonAds({ code, placement }) {
  const reference = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if(reference.current){
      reference.current.innerHTML = ''
      const s = document.createElement('script')
      s.id = '_carbonads_js'
      s.src = `//cdn.carbonads.com/carbon.js?serve=${code}&placement=${placement}`
      reference.current.appendChild(s)
    }
  }, [])
  return <div ref={reference} />
}

CarbonAds.defaultProps = {
  code: process.env.NX_CARBON_ADS_CODE,
  placement: process.env.NX_CARBON_ADS_PLACEMENT
}

CarbonAds.propTypes = {
  code: PropTypes.string,
  placement: PropTypes.string
}
