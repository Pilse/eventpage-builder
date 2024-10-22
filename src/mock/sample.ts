import { ContainerBlock, SectionBlock } from "@/domain/block";

const sampleSection1: ReturnType<InstanceType<typeof SectionBlock>["serialize"]> = {
  id: "51750cec-13f6-4491-aa11-0ca05bf3e649",
  t: 0,
  r: 0,
  b: 0,
  l: 0,
  type: "SECTION",
  position: "absolute",
  width: 700,
  height: 800,
  children: [
    {
      id: "6dwefb4d7-7241-4e44-b450-1b68fsf02283",
      t: 100,
      r: 0,
      b: 0,
      l: 220,
      type: "FRAME_ROW",
      position: "absolute",
      width: 500,
      height: 200,
      children: [
        {
          id: "c45vce1f-ed94-4b51-a029-7d0023e64a0a",
          t: 0,
          r: 10,
          b: 0,
          l: 5,
          type: "TEXT",
          position: "absolute",
          width: 100,
          height: 50,
          content: "content in frame row",
        },
        {
          id: "84411bce-12ac-4d6b-bafe-9867e8d639d7",
          t: 100,
          r: 0,
          b: 0,
          l: 5,
          type: "TEXT",
          position: "absolute",
          width: 100,
          height: 50,
          content: "content in frame row2",
        },
      ],
    },
    {
      id: "a68db648-cef9-4791-9d2a-886b40a34842",
      t: 500,
      r: 0,
      b: 0,
      l: 50,
      type: "TEXT",
      position: "absolute",
      width: 100,
      height: 50,
      content: "hello world",
    },
    {
      id: "ddd7c70d-387c-46b0-9b2a-2090bdc7143f",
      t: 600,
      r: 0,
      b: 0,
      l: 50,
      type: "TEXT",
      position: "absolute",
      width: 100,
      height: 50,
      content: "with",
    },
    {
      id: "a321ef2f-b111-4946-84e1-b29c7b7086a8",
      t: 700,
      r: 0,
      b: 0,
      l: 50,
      type: "TEXT",
      position: "absolute",
      width: 100,
      height: 50,
      content: "nextjs",
    },
    {
      id: "6de0b4d7-7231-4e44-b450-1b68ff402283",
      t: 200,
      r: 0,
      b: 0,
      l: 120,
      type: "FRAME_CANVAS",
      position: "absolute",
      width: 100,
      height: 300,
      children: [
        {
          id: "c45ce16f-ed94-4b51-a029-7d0023e64a0a",
          t: 0,
          r: 10,
          b: 0,
          l: 5,
          type: "TEXT",
          position: "absolute",
          width: 100,
          height: 50,
          content: "content in frame1",
        },
        {
          id: "844113ce-12ac-4d6b-bafe-9867e8d639d7",
          t: 100,
          r: 0,
          b: 0,
          l: 5,
          type: "TEXT",
          position: "absolute",
          width: 100,
          height: 50,
          content: "content in frame2",
        },
      ],
    },
    {
      id: "9857f180-1afe-40fc-8130-4b6f54a90957",
      t: 400,
      r: 0,
      b: 0,
      l: 100,
      type: "FRAME_CANVAS",
      position: "absolute",
      width: 400,
      height: 500,
      children: [
        {
          id: "2957484e-2db9-47ff-9dae-4959d2dec401",
          t: 0,
          r: 10,
          b: 0,
          l: 5,
          type: "TEXT",
          position: "absolute",
          width: 100,
          height: 50,
          content: "content in frame1",
        },
        {
          id: "440b434f-dda9-45d2-8b6f-48fcb8aebdde",
          t: 100,
          r: 0,
          b: 0,
          l: 5,
          type: "TEXT",
          position: "absolute",
          width: 100,
          height: 50,
          content: "content in frame2",
        },
      ],
    },
  ],
};

const sampleSection2: ReturnType<InstanceType<typeof SectionBlock>["serialize"]> = {
  id: "7383c00a-47a1-40a6-9df4-3183b0cb02c7",
  t: 0,
  r: 0,
  b: 0,
  l: 0,
  type: "SECTION",
  position: "absolute",
  width: 800,
  height: 800,
  children: [
    {
      id: "d2b2dea7-a5a8-41e7-b0b7-d45533ee04c6",
      t: 500,
      r: 0,
      b: 0,
      l: 50,
      type: "TEXT",
      position: "absolute",
      width: 100,
      height: 50,
      content: "hello world",
    },
    {
      id: "6dbbfb4d7-7241-4e44-b450-1b68esf02283",
      t: 100,
      r: 0,
      b: 0,
      l: 220,
      type: "FRAME_COL",
      position: "absolute",
      width: 500,
      height: 500,
      children: [
        {
          id: "c45vce1f-ed94-4b51-a029-7dvf23e64a0a",
          t: 0,
          r: 10,
          b: 0,
          l: 5,
          type: "TEXT",
          position: "absolute",
          width: 100,
          height: 50,
          content: "content in frame col",
        },
        {
          id: "84411bce-12ac-4d6b-ber3-9867e8d639d7",
          t: 100,
          r: 0,
          b: 0,
          l: 5,
          type: "TEXT",
          position: "absolute",
          width: 100,
          height: 50,
          content: "content in frame col2",
        },
      ],
    },
    {
      id: "6dbbfb4d7-4241-4e44-b450-1b68esf02283",
      t: 100,
      r: 0,
      b: 0,
      l: 220,
      type: "FRAME_ROW",
      position: "absolute",
      width: 500,
      height: 500,
      children: [
        {
          id: "c45vcebn-ed94-4b51-a029-7dvf23e64a0a",
          t: 0,
          r: 10,
          b: 0,
          l: 5,
          type: "TEXT",
          position: "absolute",
          width: 100,
          height: 50,
          content: "content in frame row",
        },
      ],
    },
    {
      id: "9e2f21f2-2c15-42f6-b1a2-6e22eb65f21a",
      t: 600,
      r: 0,
      b: 0,
      l: 50,
      type: "TEXT",
      position: "absolute",
      width: 100,
      height: 50,
      content: "with",
    },
    {
      id: "dbfe843f-9cd4-4f5c-9373-209574cb3e02",
      t: 700,
      r: 0,
      b: 0,
      l: 50,
      type: "TEXT",
      position: "absolute",
      width: 100,
      height: 50,
      content: "nextjs",
    },
    {
      id: "ae754972-ccf4-4008-bdc8-486853b33089",
      t: 200,
      r: 0,
      b: 0,
      l: 120,
      type: "FRAME_CANVAS",
      position: "absolute",
      width: 100,
      height: 300,
      children: [
        {
          id: "12b78fae-7914-4339-873b-bc1303ff1786",
          t: 0,
          r: 10,
          b: 0,
          l: 5,
          type: "TEXT",
          position: "absolute",
          width: 100,
          height: 50,
          content: "content in frame1",
        },
        {
          id: "c1bb2caf-6619-49e3-89dc-c6e67d49fa5f",
          t: 100,
          r: 0,
          b: 0,
          l: 5,
          type: "TEXT",
          position: "absolute",
          width: 100,
          height: 50,
          content: "content in frame2",
        },
      ],
    },
    {
      id: "66166cb6-6c13-4515-80ff-8a502adb5204",
      t: 500,
      r: 0,
      b: 0,
      l: 60,
      type: "FRAME_CANVAS",
      position: "absolute",
      width: 200,
      height: 200,
      children: [
        {
          id: "8b965f99-1170-4335-809f-18c9b27298f7",
          t: 0,
          r: 10,
          b: 0,
          l: 5,
          type: "TEXT",
          position: "absolute",
          width: 100,
          height: 50,
          content: "content in frame1",
        },
        {
          id: "367da7b6-23ee-468c-b090-75e8ceb52694",
          t: 100,
          r: 0,
          b: 0,
          l: 5,
          type: "TEXT",
          position: "absolute",
          width: 100,
          height: 50,
          content: "content in frame2",
        },
      ],
    },
  ],
};

export const sampleContainer: ReturnType<InstanceType<typeof ContainerBlock>["serialize"]> = {
  id: "d93e29f7-5518-493d-bb9b-1f659a84b93e",
  t: 0,
  r: 0,
  b: 0,
  l: 0,
  type: "CONTAINER",
  position: "relative",
  width: 900,
  height: 2000,
  children: [sampleSection1, sampleSection2],
};
