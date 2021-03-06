/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomSubsections_viewingRoom = {
    readonly subsections: ReadonlyArray<{
        readonly body: string | null;
        readonly title: string | null;
        readonly caption: string | null;
        readonly image: {
            readonly width: number | null;
            readonly height: number | null;
            readonly imageURLs: {
                readonly normalized: string | null;
            } | null;
        } | null;
    }>;
    readonly " $refType": "ViewingRoomSubsections_viewingRoom";
};
export type ViewingRoomSubsections_viewingRoom$data = ViewingRoomSubsections_viewingRoom;
export type ViewingRoomSubsections_viewingRoom$key = {
    readonly " $data"?: ViewingRoomSubsections_viewingRoom$data;
    readonly " $fragmentRefs": FragmentRefs<"ViewingRoomSubsections_viewingRoom">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ViewingRoomSubsections_viewingRoom",
  "type": "ViewingRoom",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "subsections",
      "storageKey": null,
      "args": null,
      "concreteType": "ViewingRoomSubsection",
      "plural": true,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "body",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "title",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "caption",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "image",
          "storageKey": null,
          "args": null,
          "concreteType": "ARImage",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "width",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "height",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "imageURLs",
              "storageKey": null,
              "args": null,
              "concreteType": "ImageURLs",
              "plural": false,
              "selections": [
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "normalized",
                  "args": null,
                  "storageKey": null
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
(node as any).hash = '4e54fe628a7263b72de4f5f1f2017e3a';
export default node;
