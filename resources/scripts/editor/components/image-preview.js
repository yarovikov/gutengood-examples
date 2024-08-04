import {Button} from '@wordpress/components';
import {useSelect} from '@wordpress/data';

export const ImagePreview = ({open, remove, mediaId}) => {
  const media = useSelect((select) => select('core').getMedia(mediaId), [mediaId]);
  const mediaUrl = media ? media.media_details.sizes.thumbnail.source_url : null;
  return (
    <>
      {mediaUrl
        ?
        (
          <div className='relative w-fit'>
            <div className='mb-2 w-32 aspect-square overflow-hidden relative'>
              <img className='w-full h-full absolute object-cover' src={mediaUrl} alt=''/>
              <div className='absolute top-2 right-2 flex items-center gap-2'>
                <Button
                  className='bg-white/80'
                  onClick={open}
                  icon={'edit'}
                >
                </Button>
                <Button
                  className='bg-white/80'
                  icon={'trash'}
                  onClick={remove}
                >
                </Button>
              </div>
            </div>
          </div>
        )
        :
        <Button
          className='is-primary !block'
          onClick={open}
        >
          Choose Image
        </Button>
      }
    </>
  );
}
