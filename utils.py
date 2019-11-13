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
    talks_filepath = 'src/talks.json'
    with open(talks_filepath) as json_file:
        talks = json.loads(json_file.read())['data']
        for talk in talks:
            title = talk['title'].lower()

            for category in ('deep learning', 'machine learning', 'data'):
                if category in title:
                    talk['category']['title'] = 'Data'
                    talk['category']['badge'] = 'info'

    with open(talks_filepath, 'w') as json_file:
        json.dump({'data': talks}, json_file, indent=2)


if __name__ == '__main__':
    main()
