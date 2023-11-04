import {VideoDetails} from '../services/myPackagesApiService';
import {FlatList, Text, View} from 'react-native';
import PackageKeyList from './PackageKeyList';
import {useEffect, useState} from 'react';
import {Serial} from '../services/seriaKeyListStatusApiService';

interface PackagesListProps {
    keys: Serial[];
    onRefresh: () => void;
    onPress: (item: VideoDetails) => void;
}

type CategoryName = 'Active' | 'Available' | 'Expired';
interface PackageCategory {
    categoryName: CategoryName;
    keys: Serial[];
}

const PackageCategory = ({
    packageCategory,
}: {
    packageCategory: PackageCategory;
}) => {
    return (
        <View>
            <Text className={'text-black text-lg font-bold mx-4 my-1.5'}>
                {packageCategory.categoryName}
            </Text>
            <PackageKeyList
                categoryName={packageCategory.categoryName}
                keys={packageCategory.keys}
            />
        </View>
    );
};

const PackagesList = ({keys}: PackagesListProps) => {
    const [packageCategories, setPackageCategories] = useState<
        PackageCategory[]
    >([]);

    useEffect(() => {
        let activePackages: Serial[] = [];
        let availablePackages: Serial[] = [];
        let expiredPackages: Serial[] = [];

        keys.forEach(key => {
            switch (key.serial_key_status) {
                case 'Active':
                    activePackages.push(key);
                    break;
                case 'Pending':
                    availablePackages.push(key);
                    expiredPackages.push(key);
                    break;
                case 'Expired':
                    expiredPackages.push(key);
                    break;
                default:
                    console.log('Unrecognised Key');
            }
        });

        setPackageCategories([
            {
                categoryName: 'Active',
                keys: activePackages,
            },
            {
                categoryName: 'Available',
                keys: availablePackages,
            },
            {
                categoryName: 'Expired',
                keys: expiredPackages,
            },
        ]);
    }, [keys]);

    return (
        <View>
            <FlatList
                data={packageCategories}
                renderItem={({item}) =>
                    PackageCategory({
                        packageCategory: item,
                    })
                }
            />
        </View>
    );
};

export default PackagesList;
