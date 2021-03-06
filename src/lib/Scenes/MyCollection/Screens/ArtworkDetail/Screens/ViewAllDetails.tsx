import { FancyModalHeader } from "lib/Components/FancyModal/FancyModalHeader"
import { AppStore } from "lib/store/AppStore"
import { Spacer } from "palette"
import React from "react"
import { MyCollectionArtworkMeta } from "../Components/MyCollectionArtworkMeta"

export const ViewAllDetails: React.FC<any /* TODO */> = (props) => {
  const { artwork: artworkActions, navigation: navActions } = AppStore.actions.myCollection

  return (
    <>
      <FancyModalHeader
        leftButtonText=" "
        onLeftButtonPress={() => navActions.goBack()}
        rightButtonText="Edit"
        onRightButtonPress={() => artworkActions.startEditingArtwork(props.artwork)}
      >
        Artwork Details
      </FancyModalHeader>
      <Spacer my={0.5} />
      <MyCollectionArtworkMeta artwork={props.artwork} viewAll />
    </>
  )
}
