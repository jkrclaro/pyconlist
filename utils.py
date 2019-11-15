import json


def main():
    talks_path = 'src/talks.json'
    categories_path = 'src/categories.json'

    with open(talks_path) as json_file:
        talks = json.loads(json_file.read())['data']

        with open(categories_path) as categories_file:
            categories = json.loads(categories_file.read())['data']

            for talk in talks:
                title = talk['title'].lower()

                for category in categories:
                    for keyword in category['keywords']:
                        if keyword in title:
                            talk['category']['title'] = category['title']
                            talk['category']['badge'] = category['badge']

    with open(talks_path, 'w') as json_file:
        json.dump({'data': talks}, json_file, indent=2)


if __name__ == '__main__':
    print('Updating talks.json...')
    main()
    print('Updated talks.json!')
