import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'

const Container = styled.div`
  font-size: 14px;
  display: grid;
  grid-row-gap: 10px;
  overflow: auto;
`

const DoubleCell = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 10px;
`

const A = styled.a`
  display: inline-block;
  padding-bottom: 10px;
`

function Cell({ name, children }) {
  const CellContainer = styled.div`
    font-family: 'Lato', sans-serif;
    background: #fff;
    border-radius: 5px;
    border: 1px solid #e7e7e7;
    padding: 15px 20px;
  `

  const Name = styled.div`
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 10px;
  `

  return (
    <CellContainer>
      <Name>{name}</Name>
      <div>{children}</div>
    </CellContainer>
  )
}

export default function DataGrid(patient) {
  const {
    notes,
    gender,
    ageEstimate,
    state,
    city,
    district,
    status,
    reportedOn,
    sources,
  } = patient


    let STATUS_FR = {
        "Hospitalized": "Confirmé",
        "Deceased": "Décès",
        "Recovered": "Rétabli",
    }

    const status_fr = STATUS_FR[status]

    let GENDER_FR = {
        "male": "masculin",
        "female": "féminin",
    }

    let gender_fr = gender?GENDER_FR[gender]:""
    const genderInitCap = gender_fr.charAt(0).toUpperCase() + gender_fr.slice(1)


  return (
    <Container>
      <DoubleCell>
        <Cell name="Genre">{gender ? genderInitCap : '-'}</Cell>
        <Cell name="Âge">{ageEstimate ? ageEstimate : '-'}</Cell>
      </DoubleCell>
        <Cell name="Gouvernorat">{state ? state : '-'}</Cell>

      <Cell name="État">{status_fr}</Cell>
      <Cell name="Date de confirmation">{reportedOn}</Cell>
      <Cell name="Plus d'informations">{notes}</Cell>
      <Cell name="Sources">
        {sources
          ? sources.map((source, i) => (
              <div key={i}>
                <div style={{ display: 'inline-block' }} key={i}>
                  {i + 1}.&nbsp;
                </div>
                <A
                  href={source}
                  target="_blank"
                  rel="noopener noreferer"
                  key={i}
                >
                  {_.truncate(source, {
                    length: 40,
                    separator: /,? +/,
                  })}
                </A>
              </div>
            ))
          : null}
      </Cell>
    </Container>
  )
}
