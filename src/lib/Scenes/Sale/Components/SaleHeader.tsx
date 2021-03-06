import { SaleHeader_sale } from "__generated__/SaleHeader_sale.graphql"
import { Flex, Text } from "palette"
import React from "react"
import { Animated, Dimensions, View } from "react-native"
import { createFragmentContainer, graphql } from "react-relay"
import { CaretButton } from "../../../Components/Buttons/CaretButton"
import OpaqueImageView from "../../../Components/OpaqueImageView/OpaqueImageView"
import { saleTime } from "../helpers/saleTime"

const COVER_IMAGE_HEIGHT = 260

interface AnimatedValue {
  interpolate({}): {}
}

interface Props {
  sale: SaleHeader_sale
  scrollAnim: AnimatedValue
}

export const SaleHeader: React.FC<Props> = (props) => {
  const saleTimeDetails = saleTime(props.sale)
  return (
    <>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: COVER_IMAGE_HEIGHT,
          width: "100%",
          opacity: props.scrollAnim.interpolate({
            inputRange: [0, COVER_IMAGE_HEIGHT],
            outputRange: [1, 0],
          }),
          transform: [
            {
              scale: props.scrollAnim.interpolate({
                inputRange: [-COVER_IMAGE_HEIGHT, 0, 1],
                outputRange: [2, 1, 1],
              }),
            },
            {
              translateY: props.scrollAnim.interpolate({
                inputRange: [-1, 0, 1],
                outputRange: [-0.5, 0, 0.5],
              }),
            },
          ],
        }}
      >
        {!!props.sale.coverImage?.url && (
          <OpaqueImageView
            imageURL={props.sale.coverImage.url}
            style={{
              width: Dimensions.get("window").width,
              height: COVER_IMAGE_HEIGHT,
            }}
          />
        )}
      </Animated.View>
      <View
        style={{
          backgroundColor: "white",
          marginTop: COVER_IMAGE_HEIGHT,
        }}
      >
        <Flex mx="2" mt="2">
          <Text variant="largeTitle" testID="saleName">
            {props.sale.name}
          </Text>
          <Flex my="1">
            <Text style={{ fontWeight: "bold" }} variant="text">
              {saleTimeDetails?.absolute}
            </Text>
            {!!saleTimeDetails?.relative && (
              <Text variant="text" color="black60">
                {saleTimeDetails?.relative}
              </Text>
            )}
          </Flex>
          <CaretButton text="More info about this auction" />
        </Flex>
      </View>
    </>
  )
}

export const SaleHeaderContainer = createFragmentContainer(SaleHeader, {
  sale: graphql`
    fragment SaleHeader_sale on Sale {
      name
      internalID
      liveStartAt
      endAt
      startAt
      timeZone
      coverImage {
        url
      }
    }
  `,
})
