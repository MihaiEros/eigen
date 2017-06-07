import * as React from "react"
import * as Relay from "react-relay"

import { MetadataText, PreviewText as P, SmallHeadline } from "../typography"

import { StyleSheet, ViewStyle } from "react-native"

import styled from "styled-components/native"
import colors from "../../../../data/colors"
import fonts from "../../../../data/fonts"
import OpaqueImageView from "../../opaque_image_view"

const Card = styled.View`
    marginLeft: 20
    marginRight: 20
    marginTop: 20
`

const VerticalLayout = styled.View`
    flex: 1
    flex-direction: column
`

const HorizontalLayout = styled.View`
    flex: 1
    flex-direction: row
`

const CardContent = styled(HorizontalLayout)`
    justify-content: space-between
`

const TextPreview = styled(VerticalLayout)`
    margin-left: 15
`

const DateHeading = styled(HorizontalLayout)`
    justify-content: flex-end
    margin-bottom: 4
`

const UnreadIndicator = styled.View`
    height: 8
    width: 8
    borderRadius: 4
    background-color: ${colors["purple-regular"]}
    marginLeft: 4
    marginVertical: 3
`

const Separator = styled.View`
    height: 1
    width: 100%
    background-color: ${colors["gray-regular"]}
    marginTop: 20
`
const ArtworkSubtitle = styled.Text`
  font-family: ${fonts["garamond-regular"]}
  fontSize: 16
  color: black
  marginTop: 6
  marginBottom: 2
`

const ArtworkTitle = styled(ArtworkSubtitle)`
  font-family: ${fonts["garamond-italic"]}
`

export interface Conversation {
  id: string | null
  inquiry_id: string | null
  from_name: string | null
  from_email: string | null
  to_name: string | null
  last_message: string | null
  artworks: Array<
    {
      id: string | null
      href: string | null
      title: string | null
      date: string | null
      artist: {
        name: string | null
      }
      image: {
        url: string | null
        image_url: string | null
      }
    }
  >
}

interface Props {
  conversation: Conversation
}

export class ConversationSnippet extends React.Component<Props, any> {
  render() {
    const conversation = this.props.conversation
    const artwork = conversation.artworks[0]

    const galleryName = conversation.to_name
    const artworkTitle = `${artwork.title.trim()}, `
    const artworkDate = `${artwork.date}`
    const artworkArtist = `${artwork.artist.name} · `
    const conversationText = conversation.last_message.replace(/\n/g, " ")
    const date = "11:00 AM"
    const imageURL = artwork.image.url

    return (
      <Card>
        <CardContent>
          <OpaqueImageView imageURL={imageURL} style={styles.image} />
          <TextPreview>
            <HorizontalLayout>
              <SmallHeadline>{galleryName}</SmallHeadline>
              <DateHeading>
                <MetadataText>{date}</MetadataText>
                <UnreadIndicator />
              </DateHeading>
            </HorizontalLayout>
            <HorizontalLayout>
              <P>
                <ArtworkSubtitle>{artworkArtist}</ArtworkSubtitle>
                <ArtworkTitle>{artworkTitle}</ArtworkTitle>
                <ArtworkSubtitle>{artworkDate}</ArtworkSubtitle>
              </P>
            </HorizontalLayout>
            <P>{conversationText}</P>
          </TextPreview>
        </CardContent>
        <Separator />
      </Card>
    )
  }
}

interface Styles {
  image: ViewStyle
}

// Need to keep the stylesheet for OpaqueImageView because it expects borderRadius to be an integer
// whereas styled-components converts the value to a string
const styles = StyleSheet.create<Styles>({
  image: {
    width: 58,
    height: 58,
    borderRadius: 4,
  },
})

export default Relay.createContainer(ConversationSnippet, {
  fragments: {
    conversation: () => Relay.QL`
      fragment on ConversationType {
        id
        inquiry_id
        from_name
        from_email
        to_name
        last_message
        artworks {
          id
          href
          title
          date
          artist {
            name
          }
          image {
            url
            image_url
          }
        }
      }
    `,
  },
})
