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

            # This should be at the top because python is such a used word.
            for category in (
                'community', 'pep', 'data structure', 'algorithms', 'gil',
                'pip', 'asyncio', 'python2', 'python3', 'python', 'type',
            ):
                if category in title:
                    talk['category']['title'] = 'Category: Core'
                    talk['category']['badge'] = 'python'

            for category in (
                'exception', 'hacking', 'security', 'threat', 'testing', 'bugs',
            ):
                if category in title:
                    talk['category']['title'] = 'Category: Security'
                    talk['category']['badge'] = 'danger'

            for category in (
                'keynote', 'wrap up', 'lightning talk', 'remarks', 'thank you',
                'panel discussion',
            ):
                if category in title:
                    talk['category']['title'] = 'Category: Others'
                    talk['category']['badge'] = 'light'

            for category in (
                'contributor', 'blog', 'leader', 'maintaining',
                'documentation', 'code review', 'readability',
                'open source license', 'open source self-care',
                'open source for newcomers', 'participating in open source',
                'novice', 'n00bs',
            ):
                if category in title:
                    talk['category']['title'] = 'Category: Career'
                    talk['category']['badge'] = 'success'

            for category in (
                'server', 'web', 'django', 'flask', 'ORM', 'networking',
                'protocol', 'container', 'api', 'sqlalchemy', 'alembic',
                'instagram', 'http',
            ):
                if category in title:
                    talk['category']['title'] = 'Category: Web'
                    talk['category']['badge'] = 'primary'

            for category in (
                'deep learning', 'machine learning', 'data', 'computational',
                'statistics', 'pyspark', 'network analysis', 'jupyter',
                'ipython', 'pandas', 'diagnostic', 'hadoop',
            ):
                if category in title:
                    talk['category']['title'] = 'Category: Data'
                    talk['category']['badge'] = 'info'


    with open(talks_filepath, 'w') as json_file:
        json.dump({'data': talks}, json_file, indent=2)


if __name__ == '__main__':
    main()
