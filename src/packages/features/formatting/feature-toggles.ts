type FeatureToggle = {[key: string]: boolean}

export const FEATURE_TOOGGLES: FeatureToggle = 
    {
        "beta.has.lastSyncedInfo": true, 
        "beta.has.feature1": true, 
        "beta.has.feature2": true, 
        "beta.has.feature3": true, 
        "beta.has.feature4": true, 
        "test.placeOnTop": true,
        "test.placeOnBottom": true,
        "test.premium.moreGroupOptions": true
    }


export function createToggleFolders(toggles: FeatureToggle) {
    const featureToggles: [string, boolean][] = Object.entries(toggles)
    
    const folders = createFolders(featureToggles, toggles)
    console.log(folders)
}

function createFolders(featureToggles: any[], toggles: any, folders = []) {
    if(!featureToggles.length) {return folders}

    
}


