import json


def print_to_json(data):
    print(
        '{'
        '"speakers": ["%s"], '
        '"title": "%s", '
        '"video_url": "%s", '
        '"convention": "%s", '
        '"uploaded_at": "%s", '
        '"channel_url": "%s" ,'
        '"categories": ["Data"]'
        '},' % (
            data['speakers'][0],
            data['title'],
            data['video_url'],
            data['convention'],
            data['uploaded_at'],
            data['channel_url']
        )
    )


def main():
    with open('src/talks.json') as json_file:
        talks = json.loads(json_file.read())['data']
        for index, talk in enumerate(talks):
            if index >= 428:
                print_to_json(talk)


if __name__ == '__main__':
    main()
